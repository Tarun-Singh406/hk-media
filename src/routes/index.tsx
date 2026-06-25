import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ArrowRight,
  Globe,
  Sparkles,
  Megaphone,
  Check,
  Plus,
  Play,
  Mail,
  MessageCircle,
  Instagram,
  Linkedin,
  ChevronDown,
  Quote,
} from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import whyVisual from "@/assets/why-visual.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import video1 from "@/assets/video-1.jpg";
import video2 from "@/assets/video-2.jpg";
import video3 from "@/assets/video-3.jpg";

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

/* ---------- Reveal helper ---------- */
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Eyebrow ---------- */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="h-px w-8 bg-accent" />
      {children}
    </span>
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
      <nav className="container-x flex h-[72px] items-center justify-between">
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
                  className={`group relative text-[15px] font-medium transition-colors ${
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
            style={{ boxShadow: "0 0 0 0 rgba(242,169,59,0)" }}
          >
            Let's Talk
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-text lg:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="grid place-items-center"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-x-0 top-full origin-top border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-x flex flex-col gap-2 py-8">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleClick(link.id)}
                    className="block w-full py-3 text-center font-display text-2xl font-semibold text-text"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-4">
                <button
                  onClick={() => handleClick("contact")}
                  className="block w-full rounded-full bg-accent py-4 text-center text-base font-semibold text-bg"
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
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 240]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      style={{ minHeight: "max(600px, 100svh)" }}
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,11,0.4) 0%, rgba(10,10,11,0.7) 50%, rgba(10,10,11,0.98) 100%)",
        }}
      />

      <div className="container-x relative z-10 mx-auto max-w-[820px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs font-medium text-muted backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Trusted by Dental Clinics & Coaching Institutes
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="font-display font-bold text-text"
          style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.08 }}
        >
          We Build <span className="text-accent">Websites</span>,{" "}
          <span className="text-accent">AI Video Ads</span> & Digital{" "}
          <span className="text-accent">Growth</span> — For Businesses That Want to Stand Out.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="mx-auto mt-6 max-w-[600px] text-[18px] leading-relaxed text-muted"
        >
          HK Media is a one-stop digital partner — we design your website, produce
          scroll-stopping AI-generated ads, and run your social media, so you can focus on
          running your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <button
            onClick={() => scrollToId("portfolio")}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-bg transition duration-200 hover:scale-[1.03] hover:bg-accent-hover sm:w-auto"
            style={{ boxShadow: "0 8px 24px -8px rgba(242,169,59,0.35)" }}
          >
            View Our Work
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollToId("contact")}
            className="inline-flex w-full items-center justify-center rounded-full border border-muted/60 bg-transparent px-7 py-3.5 text-[15px] font-semibold text-text transition duration-200 hover:scale-[1.03] hover:border-accent sm:w-auto"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}
      >
        <ChevronDown size={22} />
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
const SERVICES = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "Custom-built, fast-loading websites designed to convert visitors into customers. Hosting, SEO & ad setup included — no surprise costs.",
  },
  {
    icon: Sparkles,
    title: "AI Generated Video Ads",
    desc: "Cinematic, scroll-stopping video ads produced with cutting-edge AI tools. Half the cost, twice the iteration speed of a traditional shoot.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "End-to-end social media management, content calendars, and paid promotions on Meta & Google — built to drive real foot-traffic and leads.",
  },
];

function Services() {
  return (
    <section id="services" className="section-y bg-bg-alt">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>What We Do</Eyebrow>
            <h2
              className="mt-4 font-display font-bold text-text"
              style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
            >
              Our Services
            </h2>
            <p className="mt-4 text-[17px] text-muted">
              Three deeply-connected services under one roof — so your website, ads, and
              social presence finally speak the same language.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <article className="group h-full rounded-[20px] border border-border bg-surface p-10 transition duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <div
                  className="grid h-14 w-14 place-items-center rounded-2xl text-accent"
                  style={{ background: "rgba(242,169,59,0.12)" }}
                >
                  <s.icon size={26} />
                </div>
                <h3 className="mt-7 font-display text-[22px] font-semibold text-text">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.desc}</p>
                <button
                  onClick={() => scrollToId("contact")}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                >
                  Learn more
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </article>
            </Reveal>
          ))}
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
  { value: 40, suffix: "+", label: "Projects Delivered" },
  { value: 12, suffix: "+", label: "Industries Served" },
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

function WhyUs() {
  return (
    <section id="why-us" className="section-y bg-bg">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="overflow-hidden rounded-[24px] border border-border bg-surface">
                  <img
                    src={whyVisual}
                    alt="HK Media work — website mockups and analytics dashboards"
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>Why Us</Eyebrow>
              <h2
                className="mt-4 font-display font-bold text-text"
                style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
              >
                Why Businesses Choose HK Media
              </h2>
              <p className="mt-4 max-w-lg text-[17px] text-muted">
                We're not the biggest agency in town. We're the one that actually picks up
                the phone, ships on time, and treats your business like our own.
              </p>
            </Reveal>

            <ul className="mt-10 divide-y divide-border">
              {USPS.map((u, i) => (
                <Reveal key={u.title} delay={i * 0.08}>
                  <li className="flex gap-4 py-6">
                    <div
                      className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-accent/40 text-accent"
                      style={{ background: "rgba(242,169,59,0.08)" }}
                    >
                      <Check size={16} strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-[19px] font-semibold text-text">
                        {u.title}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                        {u.desc}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-surface p-6">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-display text-[28px] font-bold text-accent sm:text-[34px]">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-[12px] uppercase tracking-wider text-muted">
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

/* ---------- Portfolio ---------- */
const WEBSITES = [
  { title: "Bright Smile Dental", tag: "Dental Clinic Website", img: portfolio1 },
  { title: "Apex Coaching Academy", tag: "Coaching Institute", img: portfolio2 },
  { title: "Ortholine Specialists", tag: "Orthodontics Practice", img: portfolio3 },
];
const VIDEOS = [
  { title: "Smile Reveal Campaign", tag: "Dental Clinic Ad", img: video1 },
  { title: "Topper Stories", tag: "Coaching Institute Ad", img: video2 },
  { title: "Grand Opening Teaser", tag: "Local Business Ad", img: video3 },
];

function Portfolio() {
  const [tab, setTab] = useState<"web" | "video">("web");
  const [modal, setModal] = useState<{ title: string; img: string; tag: string } | null>(null);
  const items = tab === "web" ? WEBSITES : VIDEOS;

  return (
    <section id="portfolio" className="section-y bg-bg-alt">
      <div className="container-x">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Our Work</Eyebrow>
            <h2
              className="mt-4 font-display font-bold text-text"
              style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
            >
              Recent Projects
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 inline-flex w-full max-w-xs items-center rounded-full border border-border bg-surface p-1">
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

        <div className="mt-12 grid place-items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((p, i) => (
                <motion.button
                  key={p.title}
                  onClick={() => setModal(p)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  className="group relative block overflow-hidden rounded-[16px] border border-border bg-surface text-left"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {tab === "video" && (
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="grid h-16 w-16 place-items-center rounded-full bg-bg/70 text-accent backdrop-blur transition group-hover:scale-110">
                          <Play size={22} fill="currentColor" />
                        </div>
                      </div>
                    )}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(10,10,11,0.95), rgba(10,10,11,0))",
                      }}
                    >
                      <div className="text-xs uppercase tracking-wider text-accent">
                        {p.tag}
                      </div>
                      <div className="mt-1 font-display text-lg font-semibold text-text">
                        {p.title}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 md:hidden">
                    <div className="text-xs uppercase tracking-wider text-accent">
                      {p.tag}
                    </div>
                    <div className="mt-1 font-display text-lg font-semibold text-text">
                      {p.title}
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-bg/85 p-4 backdrop-blur"
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-[20px] border border-border bg-surface"
            >
              <button
                onClick={() => setModal(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-bg/80 text-text backdrop-blur"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <img
                src={modal.img}
                alt={modal.title}
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-6 sm:p-8">
                <div className="text-xs uppercase tracking-wider text-accent">{modal.tag}</div>
                <h3 className="mt-2 font-display text-2xl font-bold text-text">
                  {modal.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  A custom build for a client in the {modal.tag.toLowerCase()} space — delivered
                  with hosting, SEO setup, and a launch campaign. Measurable lift in inbound
                  leads within the first month.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  {
    quote:
      "HK Media rebuilt our clinic's website and ran our launch ads in under two weeks. We doubled our weekly appointment requests within a month. Genuinely impressed.",
    name: "Dr. Anjali Mehta",
    role: "Founder, Bright Smile Dental",
  },
  {
    quote:
      "Their AI video ads are the reason our admissions inquiries went from 5 a week to 30+. Plus they actually pick up the phone — which is rare these days.",
    name: "Rohit Sharma",
    role: "Director, Apex Coaching Academy",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (TESTIMONIALS.length < 2) return;
    const id = setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[i];

  return (
    <section id="testimonials" className="section-y bg-bg">
      <div className="container-x">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Client Love</Eyebrow>
            <h2
              className="mt-4 font-display font-bold text-text"
              style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
            >
              What Our Clients Say
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="relative overflow-hidden rounded-[24px] border border-border bg-surface p-8 sm:p-12">
              <Quote
                size={56}
                className="absolute left-6 top-6 text-accent/20"
                strokeWidth={1.5}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative"
                >
                  <p className="text-[18px] leading-relaxed text-text sm:text-[20px]">
                    "{t.quote}"
                  </p>
                  <div className="mt-8 h-px w-full bg-border" />
                  <div className="mt-6 flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 font-display font-bold text-accent">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-text">{t.name}</div>
                      <div className="text-sm text-muted">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {TESTIMONIALS.length > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Show testimonial ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      idx === i ? "w-8 bg-accent" : "w-2 bg-muted/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>
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
    a: "Drop us a message via the form below or ping us on WhatsApp. We'll schedule a quick 20-minute call to understand your business and send a tailored proposal within 48 hours.",
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
              style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
            >
              Frequently Asked Questions
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-[720px]">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-[17px] font-semibold text-text sm:text-[18px]">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-accent"
                    >
                      <Plus size={18} />
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
                        <p className="pb-6 pr-12 text-[15px] leading-relaxed text-muted">
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
    "w-full rounded-[10px] border border-border bg-surface px-4 py-3 text-[15px] text-text placeholder:text-muted/70 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <section id="contact" className="section-y relative overflow-hidden bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-[0.09] blur-3xl"
        style={{ background: "radial-gradient(circle, #F2A93B 0%, transparent 70%)" }}
      />
      <div className="container-x relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Get in Touch</Eyebrow>
            <h2
              className="mt-4 font-display font-bold text-text"
              style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
            >
              Let's Build Something Great Together
            </h2>
            <p className="mt-4 text-[17px] text-muted">
              Tell us about your business and we'll get back to you within 24 hours.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <div className="rounded-[24px] border border-border bg-surface/60 p-6 backdrop-blur sm:p-10">
              {status === "success" ? (
                <div className="py-12 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
                    <Check size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-text">
                    Thanks! We'll be in touch within 24 hours.
                  </h3>
                  <p className="mt-2 text-muted">
                    Meanwhile, feel free to ping us on WhatsApp for anything urgent.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5" noValidate>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text">Name</label>
                    <input
                      className={field}
                      value={state.name}
                      onChange={(e) => setState({ ...state, name: e.target.value })}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-sm text-error">{errors.name}</p>
                    )}
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-text">
                        Email
                      </label>
                      <input
                        type="email"
                        className={field}
                        value={state.email}
                        onChange={(e) => setState({ ...state, email: e.target.value })}
                        placeholder="you@business.com"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-sm text-error">{errors.email}</p>
                      )}
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
                    <label className="mb-1.5 block text-sm font-medium text-text">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className={field}
                      value={state.message}
                      onChange={(e) => setState({ ...state, message: e.target.value })}
                      placeholder="Tell us a bit about your business and what you need…"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-sm text-error">{errors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-bg transition hover:scale-[1.02] hover:bg-accent-hover disabled:opacity-70"
                    style={{ boxShadow: "0 8px 24px -8px rgba(242,169,59,0.35)" }}
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
            <div className="flex h-full flex-col gap-5">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[20px] border border-border bg-surface p-6 transition hover:border-accent/40"
              >
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-accent"
                  style={{ background: "rgba(242,169,59,0.12)" }}
                >
                  <MessageCircle size={22} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-muted">
                    Preferred
                  </div>
                  <div className="mt-0.5 font-display text-lg font-semibold text-text">
                    Chat on WhatsApp
                  </div>
                  <div className="text-sm text-muted">Fastest way to reach us</div>
                </div>
                <ArrowRight
                  size={18}
                  className="ml-auto text-muted transition group-hover:translate-x-1 group-hover:text-accent"
                />
              </a>

              <a
                href="mailto:hello@hkmedia.in"
                className="group flex items-center gap-4 rounded-[20px] border border-border bg-surface p-6 transition hover:border-accent/40"
              >
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-accent"
                  style={{ background: "rgba(242,169,59,0.12)" }}
                >
                  <Mail size={22} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-muted">Email</div>
                  <div className="mt-0.5 truncate font-display text-lg font-semibold text-text">
                    hello@hkmedia.in
                  </div>
                  <div className="text-sm text-muted">We reply within a few hours</div>
                </div>
              </a>

              <div className="rounded-[20px] border border-dashed border-border p-6">
                <div className="text-xs uppercase tracking-wider text-accent">
                  Response Time
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
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
      <div className="container-x py-14">
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
                {
                  Icon: MessageCircle,
                  href: "https://wa.me/919999999999",
                  label: "WhatsApp",
                },
                { Icon: Mail, href: "mailto:hello@hkmedia.in", label: "Email" },
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
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-[13px] text-muted sm:flex-row">
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
