import { createFileRoute } from "@tanstack/react-router";

const TO_EMAIL = "tarun.inwork@gmail.com";
const FROM_EMAIL = "HK Media <onboarding@resend.dev>";

// Simple in-memory rate limit per IP (best-effort; resets on cold start)
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

function sanitize(v: unknown, max = 2000) {
  if (typeof v !== "string") return "";
  return v.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "").trim().slice(0, max);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const ip =
            request.headers.get("cf-connecting-ip") ??
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            "unknown";

          if (rateLimited(ip)) {
            return Response.json(
              { ok: false, error: "Too many requests. Please try again in a minute." },
              { status: 429 },
            );
          }

          let payload: Record<string, unknown>;
          try {
            payload = await request.json();
          } catch {
            return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
          }

          // Honeypot — silently succeed to fool bots
          if (typeof payload.website === "string" && payload.website.trim() !== "") {
            return Response.json({ ok: true });
          }

          const name = sanitize(payload.name, 120);
          const email = sanitize(payload.email, 254);
          const phone = sanitize(payload.phone, 40);
          const business = sanitize(payload.business, 160);
          const message = sanitize(payload.message, 5000);

          if (!name || !email || !message) {
            return Response.json(
              { ok: false, error: "Please fill in your name, email, and message." },
              { status: 400 },
            );
          }
          if (!isValidEmail(email)) {
            return Response.json(
              { ok: false, error: "Please enter a valid email address." },
              { status: 400 },
            );
          }

          const apiKey = process.env.RESEND_API_KEY;
          if (!apiKey) {
            console.error("RESEND_API_KEY is not configured");
            return Response.json(
              { ok: false, error: "Email service is not configured. Please try again later." },
              { status: 500 },
            );
          }

          const submittedAt = new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "full",
            timeStyle: "short",
          });

          const row = (label: string, value: string) => `
            <tr>
              <td style="padding:10px 14px;background:#f7f7f8;border:1px solid #e5e7eb;font-size:13px;color:#6b7280;font-weight:600;width:160px;">${label}</td>
              <td style="padding:10px 14px;border:1px solid #e5e7eb;font-size:14px;color:#111827;">${value || "—"}</td>
            </tr>`;

          const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#0A0A0B;font-family:Inter,Arial,sans-serif;">
            <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;">
              <tr><td style="padding:22px 24px;background:#0A0A0B;">
                <div style="color:#F2A93B;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">HK Media</div>
                <div style="color:#ffffff;font-size:18px;font-weight:700;margin-top:6px;">New Contact Form Submission</div>
              </td></tr>
              <tr><td style="padding:24px;">
                <table role="presentation" width="100%" style="border-collapse:collapse;">
                  ${row("Full Name", escapeHtml(name))}
                  ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(email)}</a>`)}
                  ${row("Phone", phone ? `<a href="tel:${escapeHtml(phone)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(phone)}</a>` : "")}
                  ${row("Business Name", escapeHtml(business))}
                  ${row("Submitted At", escapeHtml(submittedAt) + " (IST)")}
                </table>
                <div style="margin-top:20px;">
                  <div style="font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Message</div>
                  <div style="padding:14px 16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;font-size:14px;line-height:1.6;color:#111827;white-space:pre-wrap;">${escapeHtml(message)}</div>
                </div>
              </td></tr>
              <tr><td style="padding:14px 24px;background:#f7f7f8;font-size:12px;color:#6b7280;">
                Sent from the hk-media.lovable.app contact form.
              </td></tr>
            </table>
          </body></html>`;

          const text = `New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || "—"}
Business: ${business || "—"}
Submitted: ${submittedAt} IST

Message:
${message}`;

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              from: FROM_EMAIL,
              to: [TO_EMAIL],
              reply_to: email,
              subject: `New Enquiry from ${name}${business ? ` — ${business}` : ""}`,
              html,
              text,
            }),
          });

          if (!res.ok) {
            const body = await res.text();
            console.error(`Resend failed [${res.status}]: ${body}`);
            return Response.json(
              { ok: false, error: "We couldn't send your message right now. Please try again or WhatsApp us." },
              { status: 502 },
            );
          }

          return Response.json({ ok: true });
        } catch (err) {
          console.error("Contact route error:", err);
          return Response.json(
            { ok: false, error: "Something went wrong. Please try again." },
            { status: 500 },
          );
        }
      },
    },
  },
});
