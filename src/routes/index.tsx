import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Menu,
  X,
  ArrowRight,
  Check,
  Plus,
  Mail,
  MessageCircle,
  Phone,
  Instagram,
  Linkedin,
  ChevronDown,
  Play,
} from "lucide-react";
const anuskaaThumb = { url: "/assets/images/anuskaa-dentocare.jpg" };
const amrawatiThumb = { url: "/assets/images/amrawati-tutorials.jpg" };
const aiAd1Video = { url: "/assets/videos/ai-ad-1.mp4" };
const aiAd2Video = { url: "/assets/videos/ai-ad-2.mp4" };

const WHATSAPP_URL = "https://wa.me/919608604657";
const PHONE_TEL = "tel:+919608604657";
const PHONE_DISPLAY = "+91 96086 04657";
const EMAIL = "hello.hkmedia@gmail.com";
const EMAIL_HREF = `mailto:${EMAIL}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HK Media — Websites, AI Video Ads & Digital Marketing" },
      {
        name: "description",
        content:
          "HK Media helps dental clinics, coaching institutes, and local businesses grow with custom websites, AI-generated video ads, and digital marketing.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HKMediaPage,
});

const NAV_LINKS = [
  { id: "services", label: "Services" },
  { id: "why-us", label: "Why Us" },
  { id: "portfolio", label: "Portfolio" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- Reveal ---------- */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="h-px w-8 bg-accent" />
      {children}
    </span>
  );
}

/* ---------- Browser/Laptop CSS mockup ---------- */
function BrowserMockup({ accent = false }: { accent?: boolean }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[14px] border border-border bg-[#111114] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-[#0E0E10] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A3E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A3E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A3E]" />
        <div className="ml-3 flex h-5 flex-1 items-center rounded-md bg-[#1A1A1D] px-2 text-[10px] text-muted">
          brightsmile.in
        </div>
      </div>
      {/* Site body */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="h-1.5 w-12 rounded-sm bg-text/85" />
          </div>
          <div className="flex gap-2">
            <span className="h-1 w-7 rounded-sm bg-muted/40" />
            <span className="h-1 w-7 rounded-sm bg-muted/40" />
            <span className="h-1 w-7 rounded-sm bg-muted/40" />
            <span className="h-3.5 w-12 rounded-full bg-accent" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-5 gap-3">
          <div className="col-span-3">
            <div className="h-2 w-3/4 rounded-sm bg-text/80" />
            <div className="mt-1.5 h-2 w-1/2 rounded-sm bg-text/80" />
            <div className="mt-3 h-1.5 w-full rounded-sm bg-muted/30" />
            <div className="mt-1 h-1.5 w-5/6 rounded-sm bg-muted/30" />
            <div className="mt-1 h-1.5 w-3/4 rounded-sm bg-muted/30" />
            <div className="mt-4 flex gap-2">
              <span className="h-5 w-16 rounded-full bg-accent" />
              <span className="h-5 w-16 rounded-full border border-border" />
            </div>
          </div>
          <div className="col-span-2 aspect-[4/3] overflow-hidden rounded-md bg-[#1A1A1D]">
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(242,169,59,0.25) 0%, rgba(242,169,59,0.04) 60%, transparent 100%)",
              }}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-md border border-border bg-[#15151A] p-2"
            >
              <div className={`h-1.5 w-8 rounded-sm ${accent && i === 1 ? "bg-accent" : "bg-text/70"}`} />
              <div className="mt-1.5 h-1 w-full rounded-sm bg-muted/25" />
              <div className="mt-1 h-1 w-2/3 rounded-sm bg-muted/25" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Navbar ---------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-bg/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-x flex h-[68px] items-center justify-between">
        <button
          onClick={() => scrollToId("hero")}
          className="font-display text-[22px] font-bold tracking-tight"
          aria-label="HK Media home"
        >
          <span className="text-accent">HK</span>
          <span className="text-text"> Media</span>
        </button>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => handleClick(link.id)}
                  className={`group relative text-[14px] font-medium transition-colors ${
                    isActive ? "text-accent" : "text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToId("contact")}
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition hover:scale-[1.03] hover:bg-accent-hover sm:inline-flex"
          >
            Let's Talk
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-text lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute inset-x-0 top-full border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-x flex flex-col gap-2 py-6">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleClick(link.id)}
                    className="block w-full py-3 text-center font-display text-xl font-semibold text-text"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => handleClick("contact")}
                  className="block w-full rounded-full bg-accent py-3.5 text-center text-base font-semibold text-bg"
                >
                  Let's Talk
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- Hero ---------- */
const TRUST_BADGES = [
  "SEO Ready",
  "Mobile Responsive",
  "Fast Loading",
  "WhatsApp Integrated",
  "AI Powered",
];

function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative overflow-hidden bg-bg pt-32 pb-20 md:pt-36 md:pb-24"
    >
      {/* subtle accent halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full opacity-[0.10] blur-3xl"
        style={{ background: "radial-gradient(circle, #F2A93B 0%, transparent 70%)" }}
      />
      <div aria-hidden className="absolute inset-0 grain-noise opacity-[0.4]" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* LEFT — copy */}
        <motion.div style={{ y: copyY }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-[12px] font-medium text-muted backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Trusted by Dental Clinics & Coaching Institutes
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-5 font-display font-bold text-text"
            style={{ fontSize: "clamp(30px, 4.4vw, 50px)", lineHeight: 1.08 }}
          >
            Websites, <span className="text-accent">AI Video Ads</span> &
            Marketing — Built for Local Businesses That Want to Stand Out.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
            className="mt-4 font-display text-[17px] italic text-accent/90"
          >
            From First Impression to First Customer.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted"
          >
            HK Media is a one-stop digital partner — we design your website,
            produce scroll-stopping AI ads, and run your social media, so you can
            focus on running your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3"
          >
            <button
              onClick={() => scrollToId("portfolio")}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[14px] font-semibold text-bg transition hover:scale-[1.02] hover:bg-accent-hover"
              style={{ boxShadow: "0 10px 24px -10px rgba(242,169,59,0.45)" }}
            >
              View Our Work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToId("contact")}
              className="inline-flex items-center justify-center rounded-full border border-muted/50 px-6 py-3 text-[14px] font-semibold text-text transition hover:border-accent hover:text-accent"
            >
              Get in Touch
            </button>
          </motion.div>

          {/* Trust badge strip */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-muted"
          >
            {TRUST_BADGES.map((b) => (
              <li key={b} className="inline-flex items-center gap-1.5">
                <span className="text-accent">✓</span>
                {b}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* RIGHT — CSS browser mockup + floating cards */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          style={{ y: mockupY }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <div className="float-a">
            <BrowserMockup accent />
          </div>

          {/* New Lead card */}
          <div className="float-b absolute -left-4 top-12 hidden rounded-xl border border-border bg-surface/85 px-3.5 py-2.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur sm:block">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-accent/15 text-accent font-bold text-[13px]">
                ↑
              </span>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted">Inbound</div>
                <div className="font-display text-[13px] font-semibold text-text">New Lead!</div>
              </div>
            </div>
          </div>

          {/* 5-star Review card */}
          <div className="float-c absolute -right-3 top-4 rounded-xl border border-border bg-surface/85 px-3.5 py-2.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur">
            <div className="flex items-center gap-1 text-accent">
              {[0,1,2,3,4].map(i=>(
                <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.4L6 22l1.5-7.2L2 10l7.1-1.1z"/></svg>
              ))}
            </div>
            <div className="mt-1 font-display text-[12px] font-semibold text-text">5-Star Review</div>
          </div>

          {/* Site live card */}
          <div className="float-b absolute -bottom-4 left-6 hidden rounded-xl border border-border bg-surface/85 px-3.5 py-2.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur sm:block">
            <div className="flex items-center gap-2.5">
              <span className="relative grid h-7 w-7 place-items-center rounded-full bg-success/15 text-success">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span className="absolute inset-0 animate-ping rounded-full bg-success/30" />
              </span>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted">Deployed</div>
                <div className="font-display text-[13px] font-semibold text-text">Site Live!</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted"
        style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}
      >
        <ChevronDown size={20} />
      </div>
    </section>
  );
}

/* ---------- Custom Service Icons (SVG) ---------- */
function IconWeb() {
  return (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="9" width="36" height="26" rx="3" />
      <path d="M6 16h36" />
      <circle cx="11" cy="12.5" r="1" fill="currentColor" />
      <circle cx="14.5" cy="12.5" r="1" fill="currentColor" />
      <circle cx="18" cy="12.5" r="1" fill="currentColor" />
      <path d="M12 22h12M12 26h18M12 30h9" />
      <path d="M18 39h12" />
      <path d="M24 35v4" />
    </svg>
  );
}
function IconPlay() {
  return (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="11" width="34" height="22" rx="3" />
      <path d="M21 18l9 6-9 6z" fill="currentColor" stroke="none" />
      <path d="M14 39h20" />
      <path d="M3 16l4-2M45 16l-4-2" />
    </svg>
  );
}
function IconMegaphone() {
  return (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 20h6l18-8v24l-18-8h-6a4 4 0 0 1 0-8z" />
      <path d="M16 28v8a3 3 0 0 0 6 0v-5" />
      <path d="M40 18c2 1.5 2 9.5 0 11" />
    </svg>
  );
}

const SERVICES = [
  {
    Icon: IconWeb,
    title: "Websites That Generate Leads",
    desc: "Custom-built, fast-loading sites engineered to convert visitors into booked appointments and enquiries — hosting, SEO & ad setup included.",
  },
  {
    Icon: IconPlay,
    title: "AI Videos That Stop The Scroll",
    desc: "Cinematic AI-generated video ads built to grab attention in the first 2 seconds. Half the cost, twice the iteration speed of a traditional shoot.",
  },
  {
    Icon: IconMegaphone,
    title: "Marketing That Brings Customers",
    desc: "End-to-end social media, content calendars, and Meta/Google ad campaigns built to drive real foot-traffic, calls, and leads to your business.",
  },
];

function Services() {
  return (
    <section id="services" className="section-y relative bg-bg-alt">
      <div aria-hidden className="absolute inset-0 grain-noise opacity-[0.5]" />
      <div className="container-x relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>What We Do</Eyebrow>
            <h2
              className="mt-4 font-display font-bold text-text"
              style={{ fontSize: "clamp(26px, 3.4vw, 36px)" }}
            >
              Three services. One growth engine.
            </h2>
            <p className="mt-4 text-[16px] text-muted">
              Your website, ads, and social presence — finally speaking the same language.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const floatClass = i === 0 ? "float-a" : i === 1 ? "float-b" : "float-c";
            return (
              <Reveal key={s.title} delay={i * 0.08} className={floatClass}>
                <article className="glow-card group relative h-full overflow-hidden rounded-[18px] border border-border bg-surface p-8">
                  <div aria-hidden className="absolute inset-0 grain-noise opacity-[0.6]" />
                  <div className="relative">
                    <div
                      className="grid h-14 w-14 place-items-center rounded-[14px] text-accent"
                      style={{ background: "rgba(242,169,59,0.10)", border: "1px solid rgba(242,169,59,0.18)" }}
                    >
                      <s.Icon />
                    </div>
                    <h3 className="mt-7 font-display text-[20px] font-semibold leading-snug text-text">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{s.desc}</p>
                    <button
                      onClick={() => scrollToId("contact")}
                      className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent"
                    >
                      Learn more
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Us ---------- */
const USPS = [
  {
    title: "Niche Expertise",
    desc: "We specialize in dental clinics & coaching institutes — we already speak your customers' language.",
  },
  {
    title: "Everything in One Place",
    desc: "Website, ads, and marketing under one roof. No juggling multiple vendors or chasing handoffs.",
  },
  {
    title: "Hosting, SEO & Ads Included",
    desc: "No hidden setup costs, no surprise add-ons. One transparent price covers what you actually need.",
  },
  {
    title: "Fast Turnaround",
    desc: "Most websites go live within days, not months. We move at the speed of your business.",
  },
  {
    title: "Ongoing Support",
    desc: "We don't disappear after launch — continuous support, edits, and strategy are built in.",
  },
];

const STATS = [
  { value: 8, suffix: "+", label: "Projects Delivered" },
  { value: 4, suffix: "+", label: "Industries Served" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now();
            const dur = 1500;
            const step = (t: number) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(eased * value));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* CSS-built laptop frame */
function LaptopMockup() {
  return (
    <div className="w-full">
      {/* Screen */}
      <div className="relative rounded-t-[14px] border border-border border-b-0 bg-[#0E0E10] p-2.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
        <div className="overflow-hidden rounded-[8px] border border-border bg-[#111114]">
          {/* mini site */}
          <div className="flex items-center gap-1.5 border-b border-border bg-[#0E0E10] px-2.5 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#3A3A3E]" />
            <span className="h-2 w-2 rounded-full bg-[#3A3A3E]" />
            <span className="h-2 w-2 rounded-full bg-[#3A3A3E]" />
            <div className="ml-2 h-3.5 flex-1 rounded-sm bg-[#1A1A1D]" />
          </div>
          <div className="p-3.5">
            <div className="flex items-center justify-between">
              <span className="h-2 w-14 rounded-sm bg-accent" />
              <div className="flex gap-1.5">
                <span className="h-1.5 w-6 rounded-sm bg-muted/40" />
                <span className="h-1.5 w-6 rounded-sm bg-muted/40" />
                <span className="h-3 w-10 rounded-full bg-accent" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2.5">
              <div className="col-span-3 space-y-1.5">
                <div className="h-2.5 w-3/4 rounded-sm bg-text/85" />
                <div className="h-2.5 w-1/2 rounded-sm bg-text/85" />
                <div className="mt-2 h-1.5 w-full rounded-sm bg-muted/30" />
                <div className="h-1.5 w-5/6 rounded-sm bg-muted/30" />
              </div>
              <div
                className="col-span-2 aspect-square rounded-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(242,169,59,0.3) 0%, rgba(242,169,59,0.05) 70%, transparent 100%)",
                }}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-md border border-border bg-[#15151A] p-2">
                  <div className="h-1.5 w-6 rounded-sm bg-accent/80" />
                  <div className="mt-1 h-1 w-full rounded-sm bg-muted/25" />
                  <div className="mt-1 h-1 w-3/4 rounded-sm bg-muted/25" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Base */}
      <div className="relative">
        <div className="h-2 rounded-b-[14px] bg-[#1A1A1D] shadow-[0_2px_0_0_#2A2A2E_inset]" />
        <div className="mx-auto h-1.5 w-1/3 rounded-b-md bg-[#0E0E10]" />
      </div>
    </div>
  );
}

function WhyUs() {
  return (
    <section id="why-us" className="section-y bg-bg">
      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* LEFT: CSS laptop with floating metrics */}
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-[520px] lg:sticky lg:top-28">
              <Reveal>
                <div className="float-a">
                  <LaptopMockup />
                </div>
              </Reveal>

              {/* Floating metric: Leads */}
              <div className="float-b absolute -left-3 top-8 rounded-xl border border-border bg-surface/85 p-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur">
                <div className="text-[10.5px] uppercase tracking-wider text-muted">Leads</div>
                <div className="mt-0.5 flex items-baseline gap-1">
                  <span className="font-display text-[20px] font-bold text-accent">3x</span>
                  <span className="text-[11px] text-muted">↑ MoM</span>
                </div>
              </div>

              {/* Floating metric: Pagespeed */}
              <div className="float-c absolute -right-3 top-1/3 rounded-xl border border-border bg-surface/85 p-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur">
                <div className="text-[10.5px] uppercase tracking-wider text-muted">Site Speed</div>
                <div className="mt-0.5 flex items-baseline gap-1">
                  <span className="font-display text-[20px] font-bold text-accent">98</span>
                  <span className="text-[11px] text-muted">/100</span>
                </div>
              </div>

              {/* Floating metric: Retention */}
              <div className="float-b absolute -bottom-2 left-10 hidden rounded-xl border border-border bg-surface/85 p-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur sm:block">
                <div className="text-[10.5px] uppercase tracking-wider text-muted">Retention</div>
                <div className="mt-0.5 font-display text-[18px] font-bold text-accent">98%</div>
              </div>
            </div>
          </div>

          {/* RIGHT: bullets */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>Why Us</Eyebrow>
              <h2
                className="mt-4 font-display font-bold text-text"
                style={{ fontSize: "clamp(26px, 3.4vw, 36px)" }}
              >
                Why Businesses Choose HK Media
              </h2>
              <p className="mt-4 max-w-lg text-[16px] text-muted">
                We're not the biggest agency in town. We're the one that actually
                picks up the phone, ships on time, and treats your business like
                our own.
              </p>
            </Reveal>

            <ul className="mt-8 divide-y divide-border">
              {USPS.map((u, i) => (
                <Reveal key={u.title} delay={i * 0.06}>
                  <li className="flex gap-4 py-5">
                    <div
                      className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/40 text-accent"
                      style={{ background: "rgba(242,169,59,0.08)" }}
                    >
                      <Check size={14} strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-[17px] font-semibold text-text">
                        {u.title}
                      </h3>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{u.desc}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.15}>
              <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-border bg-surface p-5">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-display text-[24px] font-bold text-accent sm:text-[30px]">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-muted">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Portfolio (CSS mockup cards) ---------- */
type Project = {
  title: string;
  industry: string;
  goal: string;
  variant: "dental" | "coaching" | "ortho" | "video-dental" | "video-coaching" | "video-local";
  thumbnail?: string;
  liveUrl?: string;
  videoUrl?: string;
};

const WEB_PROJECTS: Project[] = [
  {
    title: "Anuskaa Dentocare",
    industry: "Dental Clinic Website",
    goal: "Modern dental clinic website with appointment booking, responsive design, WhatsApp integration and lead generation.",
    variant: "dental",
    thumbnail: anuskaaThumb.url,
    liveUrl: "https://anuskaa-dentocare.lovable.app/",
  },
  {
    title: "AMRAWATI TUTORIALS",
    industry: "Coaching Institute Website",
    goal: "Professional coaching institute website designed for admissions, student enquiries and online growth.",
    variant: "coaching",
    thumbnail: amrawatiThumb.url,
    liveUrl: "https://your-coaching-demo.lovable.app",
  },
];

const VIDEO_PROJECTS: Project[] = [
  {
    title: "Scroll-Stopping Brand Reel",
    industry: "AI Video Advertisement",
    goal: "Cinematic AI-generated promotional advertisement crafted to grab attention in the first two seconds and drive customer engagement.",
    variant: "video-local",
    videoUrl: aiAd1Video.url,
  },
  {
    title: "Product Story Ad",
    industry: "AI Video Advertisement",
    goal: "Premium AI-generated short-form ad designed to boost brand recall and convert social viewers into paying customers.",
    variant: "video-local",
    videoUrl: aiAd2Video.url,
  },
];

function ProjectVisual({
  variant,
  thumbnail,
  videoUrl,
  title,
}: {
  variant: Project["variant"];
  thumbnail?: string;
  videoUrl?: string;
  title?: string;
}) {
  if (videoUrl) {
    return (
      <video
        src={videoUrl}
        muted
        playsInline
        preload="metadata"
        aria-label={title ?? "AI video advertisement preview"}
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
    );
  }
  if (thumbnail) {
    return (
      <img
        src={thumbnail}
        alt={title ?? "Project screenshot"}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
      />
    );
  }

  // Website variants — same shell, different accent palette via gradient
  const gradientByVariant: Record<string, string> = {
    dental: "linear-gradient(135deg, rgba(242,169,59,0.22), transparent 60%)",
    coaching: "linear-gradient(135deg, rgba(242,169,59,0.32), transparent 60%)",
    ortho: "linear-gradient(135deg, rgba(242,169,59,0.16), transparent 60%)",
  };
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0E0E10]">
      <div className="absolute inset-0" style={{ background: gradientByVariant[variant] }} />
      <div className="absolute inset-4 overflow-hidden rounded-[10px] border border-border bg-[#111114]">
        <div className="flex items-center gap-1.5 border-b border-border bg-[#0E0E10] px-2.5 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#3A3A3E]" />
          <span className="h-2 w-2 rounded-full bg-[#3A3A3E]" />
          <span className="h-2 w-2 rounded-full bg-[#3A3A3E]" />
          <div className="ml-2 h-3 flex-1 rounded-sm bg-[#1A1A1D]" />
        </div>
        <div className="p-3">
          <div className="flex justify-between">
            <span className="h-2 w-12 rounded-sm bg-accent" />
            <div className="flex gap-1.5">
              <span className="h-1.5 w-5 rounded-sm bg-muted/40" />
              <span className="h-1.5 w-5 rounded-sm bg-muted/40" />
              <span className="h-3 w-9 rounded-full bg-accent" />
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-2.5 w-3/4 rounded-sm bg-text/80" />
            <div className="h-2.5 w-1/2 rounded-sm bg-text/80" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[0,1,2].map(i=>(
              <div key={i} className="aspect-square rounded-sm bg-[#15151A] border border-border" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoLightbox({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative w-full max-w-5xl overflow-hidden rounded-[16px] border border-border bg-black shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-bg/70 text-text backdrop-blur transition hover:bg-accent hover:text-bg"
        >
          <X size={18} />
        </button>
        <video
          src={src}
          autoPlay
          controls
          playsInline
          className="block h-auto max-h-[85vh] w-full bg-black"
        />
      </motion.div>
    </motion.div>
  );
}

function Portfolio() {
  const [tab, setTab] = useState<"web" | "video">("web");
  const [lightbox, setLightbox] = useState<Project | null>(null);
  const items = tab === "web" ? WEB_PROJECTS : VIDEO_PROJECTS;

  return (
    <section id="portfolio" className="section-y bg-bg-alt">
      <div className="container-x">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Our Work</Eyebrow>
            <h2
              className="mt-4 font-display font-bold text-text"
              style={{ fontSize: "clamp(26px, 3.4vw, 36px)" }}
            >
              Recent Projects
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-8 inline-flex w-full max-w-xs items-center rounded-full border border-border bg-surface p-1">
            {(["web", "video"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative flex-1 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                {tab === t && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                <span className={`relative ${tab === t ? "text-bg" : "text-muted"}`}>
                  {t === "web" ? "Websites" : "AI Video Ads"}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid place-items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((p, i) => {
                const isVideo = Boolean(p.videoUrl);
                const openVideo = () => isVideo && setLightbox(p);
                return (
                  <motion.article
                    key={p.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                    className="glow-card group flex h-full flex-col overflow-hidden rounded-[16px] border border-border bg-surface"
                  >
                    <div
                      className={`relative aspect-[16/10] overflow-hidden border-b border-border ${isVideo ? "cursor-pointer" : ""}`}
                      onClick={openVideo}
                      role={isVideo ? "button" : undefined}
                      aria-label={isVideo ? `Play ${p.title}` : undefined}
                    >
                      <ProjectVisual
                        variant={p.variant}
                        thumbnail={p.thumbnail}
                        videoUrl={p.videoUrl}
                        title={p.title}
                      />
                      {isVideo && (
                        <>
                          <div className="pointer-events-none absolute inset-0 bg-bg/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <div className="pointer-events-none absolute inset-0 grid place-items-center">
                            <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-bg shadow-[0_12px_30px_-8px_rgba(242,169,59,0.65)] transition-transform duration-300 group-hover:scale-110">
                              <Play size={22} fill="currentColor" />
                            </span>
                          </div>
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-bg shadow-[0_10px_24px_-10px_rgba(242,169,59,0.6)]">
                              Watch Video
                              <Play size={13} fill="currentColor" />
                            </span>
                          </div>
                        </>
                      )}
                      {p.liveUrl && !isVideo && (
                        <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-bg/85 via-bg/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-bg shadow-[0_10px_24px_-10px_rgba(242,169,59,0.6)]">
                            View Live
                            <ArrowRight size={14} />
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="inline-flex w-fit items-center rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-accent">
                        {p.industry}
                      </div>
                      <h3 className="mt-3 font-display text-[17px] font-semibold text-text">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                        {p.goal}
                      </p>
                      {isVideo ? (
                        <button
                          onClick={openVideo}
                          className="mt-5 inline-flex items-center gap-1.5 self-start text-[13px] font-semibold text-accent"
                        >
                          Watch Video
                          <Play size={13} fill="currentColor" className="transition-transform group-hover:translate-x-1" />
                        </button>
                      ) : p.liveUrl ? (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-1.5 self-start text-[13px] font-semibold text-accent"
                        >
                          View Live
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </a>
                      ) : (
                        <button
                          onClick={() => scrollToId("contact")}
                          className="mt-5 inline-flex items-center gap-1.5 self-start text-[13px] font-semibold text-accent"
                        >
                          View Live
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </button>
                      )}
                    </div>
                  </motion.article>
                );
              })}
              {items.length === 0 && (
                <div className="col-span-full py-12 text-center text-muted">
                  New case studies coming soon.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {lightbox && lightbox.videoUrl && (
          <VideoLightbox
            src={lightbox.videoUrl}
            title={lightbox.title}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}


/* ---------- Testimonials (Google-review style grid) ---------- */
const TESTIMONIALS = [
  {
    name: "Dr. Anuskaa Kumari",
    role: "\u00a0Anuskaa Dentocare: Ranchi",
    company: "",
    quote:
      "HK Media rebuilt our clinic's site and ran our launch ads in under two weeks. Weekly appointment requests doubled in a month.",
  },
  {
    name: "Rohit Sharma",
    role: "Director",
    company: "Amrawati Tutorials",
    quote:
      "Their AI video ads took our admission enquiries from 5 a week to 30+. Plus, they actually pick up the phone — rare these days.",
  },
  {
    name: "Dr. Karan Verma",
    role: "Principal Dentist",
    company: "Ortholine Specialists",
    quote:
      "Honest pricing, fast turnaround, and no jargon. Our new site has been a lead-generation machine since day one.",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-accent">
      {[0,1,2,3,4].map(i=>(
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.4L6 22l1.5-7.2L2 10l7.1-1.1z"/></svg>
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="section-y bg-bg">
      <div className="container-x">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Client Love</Eyebrow>
            <h2
              className="mt-4 font-display font-bold text-text"
              style={{ fontSize: "clamp(26px, 3.4vw, 36px)" }}
            >
              What Our Clients Say
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <article className="glow-card flex h-full flex-col rounded-[16px] border border-border bg-surface p-6">
                <div className="flex items-center justify-between">
                  <Stars />
                  <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10.5px] font-medium text-success">
                    <Check size={10} strokeWidth={3} />
                    Verified Client
                  </span>
                </div>
                <p className="mt-4 text-[14.5px] leading-relaxed text-text">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 font-display text-[13px] font-bold text-accent">
                    {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-[14px] font-semibold text-text">
                      {t.name}
                    </div>
                    <div className="truncate text-[12.5px] text-muted">
                      {t.role} {t.company && `· ${t.company}`}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const FAQS = [
  {
    q: "How long does it take to build a website?",
    a: "Most of our websites go live within 7–14 days, depending on content readiness. Larger custom builds may take 3–4 weeks. We give you a realistic timeline upfront and stick to it.",
  },
  {
    q: "Is hosting included in the package?",
    a: "Yes. Every website we build includes hosting, SSL, and basic SEO setup for the first year — no hidden costs and no separate hosting bills.",
  },
  {
    q: "Do you provide support after the website goes live?",
    a: "Absolutely. Ongoing support, edits, and minor design tweaks are included. We don't disappear after launch — we treat your site like a living asset.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We focus primarily on dental clinics, coaching institutes, and local service businesses. Niching down means we already know what works in your industry.",
  },
  {
    q: "Can you also help with social media and ads, not just the website?",
    a: "Yes — that's actually our sweet spot. Most clients hire us for the full package: website + AI video ads + ongoing social media and Meta/Google ads management.",
  },
  {
    q: "How do we get started?",
    a: "Drop us a message via the form below or ping us on WhatsApp. We'll schedule a quick 20-minute call and send a tailored proposal within 48 hours.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-y bg-bg-alt">
      <div className="container-x">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Got Questions?</Eyebrow>
            <h2
              className="mt-4 font-display font-bold text-text"
              style={{ fontSize: "clamp(26px, 3.4vw, 36px)" }}
            >
              Frequently Asked Questions
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-[720px]">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-[16px] font-semibold text-text sm:text-[17px]">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-accent"
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-10 text-[14.5px] leading-relaxed text-muted">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
const CONTACT_PROMISES = [
  "Free Consultation",
  "Response Within 24 Hours",
  "100% Custom Design",
  "No Hidden Charges",
];

function Contact() {
  const [state, setState] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!state.name.trim()) e.name = "Please enter your name";
    if (!state.email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email))
      e.email = "Please enter a valid email";
    if (!state.message.trim()) e.message = "Please write a short message";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1200);
  };

  const field =
    "w-full rounded-[10px] border border-border bg-surface px-4 py-3 text-[14.5px] text-text placeholder:text-muted/70 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <section id="contact" className="section-y relative overflow-hidden bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-[0.09] blur-3xl"
        style={{ background: "radial-gradient(circle, #F2A93B 0%, transparent 70%)" }}
      />
      <div className="container-x relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Get in Touch</Eyebrow>
            <h2
              className="mt-4 font-display font-bold text-text"
              style={{ fontSize: "clamp(26px, 3.4vw, 36px)" }}
            >
              Let's Build Something Great Together
            </h2>
            <p className="mt-4 text-[16px] text-muted">
              Tell us about your business and we'll get back to you within 24 hours.
            </p>
          </div>
        </Reveal>

        {/* Promise strip */}
        <Reveal delay={0.08}>
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-full border border-border bg-surface/60 px-5 py-3 text-[13px] text-text backdrop-blur">
            {CONTACT_PROMISES.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5">
                <span className="text-accent">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <Reveal>
            <div className="rounded-[20px] border border-border bg-surface/60 p-6 backdrop-blur sm:p-8">
              {status === "success" ? (
                <div className="py-10 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
                    <Check size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-text">
                    Thanks! We'll be in touch within 24 hours.
                  </h3>
                  <p className="mt-2 text-muted">
                    Meanwhile, feel free to ping us on WhatsApp for anything urgent.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4" noValidate>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text">Name</label>
                    <input
                      className={field}
                      value={state.name}
                      onChange={(e) => setState({ ...state, name: e.target.value })}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="mt-1.5 text-sm text-error">{errors.name}</p>}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-text">Email</label>
                      <input
                        type="email"
                        className={field}
                        value={state.email}
                        onChange={(e) => setState({ ...state, email: e.target.value })}
                        placeholder="you@business.com"
                      />
                      {errors.email && <p className="mt-1.5 text-sm text-error">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-text">
                        Phone <span className="text-muted">(optional)</span>
                      </label>
                      <input
                        className={field}
                        value={state.phone}
                        onChange={(e) => setState({ ...state, phone: e.target.value })}
                        placeholder="+91 9 ____ _____"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text">Message</label>
                    <textarea
                      rows={5}
                      className={field}
                      value={state.message}
                      onChange={(e) => setState({ ...state, message: e.target.value })}
                      placeholder="Tell us a bit about your business and what you need…"
                    />
                    {errors.message && <p className="mt-1.5 text-sm text-error">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-bg transition hover:scale-[1.02] hover:bg-accent-hover disabled:opacity-70"
                    style={{ boxShadow: "0 10px 24px -10px rgba(242,169,59,0.45)" }}
                  >
                    {status === "loading" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg/30 border-t-bg" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group glow-card flex items-center gap-4 rounded-[16px] border border-border bg-surface p-5"
              >
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-accent"
                  style={{ background: "rgba(242,169,59,0.12)" }}
                >
                  <MessageCircle size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-muted">Preferred</div>
                  <div className="mt-0.5 font-display text-[16px] font-semibold text-text">
                    Chat on WhatsApp
                  </div>
                  <div className="text-[13px] text-muted">Fastest way to reach us</div>
                </div>
                <ArrowRight
                  size={16}
                  className="ml-auto text-muted transition group-hover:translate-x-1 group-hover:text-accent"
                />
              </a>

              <a
                href={PHONE_TEL}
                className="group glow-card flex items-center gap-4 rounded-[16px] border border-border bg-surface p-5"
              >
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-accent"
                  style={{ background: "rgba(242,169,59,0.12)" }}
                >
                  <Phone size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-muted">Call</div>
                  <div className="mt-0.5 truncate font-display text-[16px] font-semibold text-text">
                    {PHONE_DISPLAY}
                  </div>
                  <div className="text-[13px] text-muted">Mon–Sat, 10am–7pm IST</div>
                </div>
              </a>

              <a
                href={EMAIL_HREF}
                className="group glow-card flex items-center gap-4 rounded-[16px] border border-border bg-surface p-5"
              >
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-accent"
                  style={{ background: "rgba(242,169,59,0.12)" }}
                >
                  <Mail size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-muted">Email</div>
                  <div className="mt-0.5 truncate font-display text-[16px] font-semibold text-text">
                    {EMAIL}
                  </div>
                  <div className="text-[13px] text-muted">We reply within a few hours</div>
                </div>
              </a>

              <div className="rounded-[16px] border border-dashed border-border p-5">
                <div className="text-[11px] uppercase tracking-wider text-accent">
                  Response Time
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  We typically respond within a few hours during business days
                  (Mon–Sat, 10am–7pm IST). Urgent? WhatsApp is fastest.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-bg-alt">
      <div className="container-x py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-[22px] font-bold">
              <span className="text-accent">HK</span>
              <span className="text-text"> Media</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Websites, AI ads, and growth — built for ambitious local businesses.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-text">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="transition hover:text-accent"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-text">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <button
                    onClick={() => scrollToId("services")}
                    className="text-left transition hover:text-accent"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-text">
              Connect
            </h4>
            <div className="mt-4 flex gap-3">
              {[
                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: MessageCircle, href: WHATSAPP_URL, label: "WhatsApp" },
                { Icon: Mail, href: EMAIL_HREF, label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition hover:scale-110 hover:border-accent hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-[12.5px] text-muted sm:flex-row">
          <p>© 2026 HK Media. All rights reserved.</p>
          <p>Made with care for local businesses.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function HKMediaPage() {
  return (
    <main className="overflow-x-clip bg-bg">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
