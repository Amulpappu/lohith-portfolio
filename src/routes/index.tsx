import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/data/portfolio";

const TITLE = "Lohith K — Software Engineer · Cyber Security Student";
const DESC =
  "Lohith K — Cyber Security student in Coimbatore seeking software-engineering internships. Discord bots, admin dashboards, Android apps and AI tools in Python, TypeScript and Kotlin.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Magnetic({ children, href, className = "", external }: { children: ReactNode; href: string; className?: string; external?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: React.MouseEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const leave = () => ref.current && (ref.current.style.transform = "");
  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`inline-flex items-center transition-transform duration-300 ease-out ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-9 w-9 place-items-center rounded-full border font-mono text-xs transition-colors hover:bg-muted"
    >
      {dark ? "☀" : "◐"}
    </button>
  );
}

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <p className="mb-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
      {n} — {title}
    </p>
  );
}

function Clock() {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const f = () =>
      setT(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date()));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return <span>Coimbatore, IN — {t} IST</span>;
}

const nav = [
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Achievements", "#achievements"],
  ["Contact", "#contact"],
] as const;

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function StatusChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      {children}
    </span>
  );
}

export function Index() {
  useReveal();
  const { links } = site;
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-5 md:px-8">
          <a href="#top" className="font-display text-lg font-semibold tracking-tight" aria-label="Lohith K — back to top">{site.monogram}</a>
          <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {nav.map(([l, h]) => (
              <Magnetic key={h} href={h} className="hover:text-foreground">{l}</Magnetic>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main id="main" tabIndex={-1} className="mx-auto max-w-[1100px] px-5 outline-none md:px-8">
        {/* Hero */}
        <section id="top" aria-labelledby="hero-title" className="flex min-h-[82vh] flex-col justify-center py-20">
          <ul className="reveal flex flex-wrap gap-2" aria-label="Focus">
            {site.chips.map((c) => (
              <li key={c} className="rounded-full border px-3 py-1 font-mono text-xs text-muted-foreground">{c}</li>
            ))}
          </ul>
          <h1 id="hero-title" className="reveal mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {site.headline}
            <span className="cursor-blink ml-1 inline-block h-[0.8em] w-[0.08em] translate-y-[0.05em] bg-accent align-baseline" aria-hidden />
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{site.subline}</p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-3">
            <Magnetic href="#projects" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
              View projects <span aria-hidden className="ml-1">→</span>
            </Magnetic>
            <Magnetic href="#contact" className="rounded-full border px-6 py-3 text-sm font-medium hover:bg-muted">
              Contact
            </Magnetic>
            {site.resumeUrl && (
              <a href={site.resumeUrl} {...ext} className="rounded-full border px-6 py-3 text-sm font-medium hover:bg-muted">
                Résumé <span aria-hidden>↗</span>
              </a>
            )}
            <a href={links.github} {...ext} aria-label="GitHub profile" className="grid h-11 w-11 place-items-center rounded-full border text-muted-foreground transition-colors hover:text-accent">
              <GitHubIcon />
            </a>
            <a href={links.linkedin} {...ext} aria-label="LinkedIn profile" className="grid h-11 w-11 place-items-center rounded-full border text-muted-foreground transition-colors hover:text-accent">
              <LinkedInIcon />
            </a>
          </div>
          <div className="reveal mt-8 inline-flex w-fit items-center gap-2.5 rounded-full border px-3.5 py-1.5 font-mono text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {site.status}
          </div>
          <dl className="reveal mt-12 grid gap-3 sm:grid-cols-3">
            {site.tiles.map((t) => (
              <div key={t.label} className="rounded-xl border p-5">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{t.label}</dt>
                <dd className="mt-2 text-sm">{t.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* About */}
        <section id="about" aria-labelledby="about-title" className="scroll-mt-20 border-t py-24 md:py-32">
          <SectionLabel n="01" title="About" />
          <h2 id="about-title" className="sr-only">About and education</h2>
          <div className="grid gap-14 md:grid-cols-[1.3fr_1fr]">
            <p className="reveal font-display text-2xl leading-snug tracking-tight md:text-3xl">{site.about}</p>
            <div className="reveal">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Education</h3>
              <ol className="mt-6 border-l">
                {site.education.map((e) => (
                  <li key={e.title} className="relative pb-8 pl-6 last:pb-0">
                    <span className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full border bg-background" />
                    <p className="font-mono text-xs text-accent">{e.period}</p>
                    <p className="mt-1 text-sm font-medium">{e.title}</p>
                    <p className="text-sm text-muted-foreground">{e.place}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20 border-t py-24 md:py-32">
          <SectionLabel n="02" title="Projects" />
          <h2 id="projects-title" className="sr-only">Projects</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.projects.map((p) => {
              const extra = p.links ?? [];
              return (
                <article
                  key={p.title}
                  className={`reveal group flex flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/30 ${
                    p.featured || p.title === "Gamer Portfolio" ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="aspect-[2/1] overflow-hidden border-b bg-muted">
                    <img
                      src={p.image}
                      alt={`GitHub repository preview for ${p.title}`}
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={600}
                      className="h-full w-full object-cover opacity-90 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <StatusChip>{p.status}</StatusChip>
                    <h3 className={`mt-4 font-semibold tracking-tight ${p.featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                      {p.title}
                    </h3>
                    {p.subtitle && (
                      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">{p.subtitle}</p>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.problem}</p>
                    <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">What I built</p>
                    <ul className="mt-2 space-y-1.5 text-sm">
                      {p.built.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-accent" aria-hidden>–</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
                      {p.tags.map((t) => (
                        <li key={t} className="rounded-md bg-muted px-2 py-1 font-mono text-[11px] text-muted-foreground">{t}</li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 font-mono text-xs">
                      {p.repoUrl && (
                        <a href={p.repoUrl} {...ext} aria-label={`View code for ${p.title}`} className="text-accent underline-offset-4 hover:underline">
                          View code <span aria-hidden>↗</span>
                        </a>
                      )}
                      {extra.map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          {...ext}
                          aria-label={`${p.title} — ${l.label}`}
                          className="text-accent underline-offset-4 hover:underline"
                        >
                          {l.label} <span aria-hidden>↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" aria-labelledby="skills-title" className="scroll-mt-20 border-t py-24 md:py-32">
          <SectionLabel n="03" title="Skills & Tools" />
          <h2 id="skills-title" className="sr-only">Skills and tools</h2>
          <div className="divide-y border-y">
            {site.skills.map((g) => (
              <div key={g.group} className="reveal grid gap-4 py-6 md:grid-cols-[220px_1fr]">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{g.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-full border px-3 py-1.5 font-mono text-sm">{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section id="achievements" aria-labelledby="ach-title" className="scroll-mt-20 border-t py-24 md:py-32">
          <SectionLabel n="04" title="Achievements & Competitions" />
          <h2 id="ach-title" className="sr-only">Achievements and competitions</h2>
          <ul className="divide-y border-y">
            {site.achievements.map((a) => (
              <li key={a.title} className="reveal flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium tracking-tight">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.detail}</p>
                </div>
                <StatusChip>{a.status}</StatusChip>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t py-24 md:py-36">
          <SectionLabel n="05" title="Contact" />
          <h2 id="contact-title" className="reveal text-5xl font-semibold leading-none md:text-8xl">Let's build something.</h2>
          <div className="reveal mt-12 flex flex-wrap gap-x-10 gap-y-4 text-lg">
            <Magnetic href={links.github} external className="underline-offset-8 hover:text-accent hover:underline">GitHub ↗</Magnetic>
            <Magnetic href={links.linkedin} external className="underline-offset-8 hover:text-accent hover:underline">LinkedIn ↗</Magnetic>
            {links.email && (
              <Magnetic href={`mailto:${links.email}`} className="underline-offset-8 hover:text-accent hover:underline">{links.email}</Magnetic>
            )}
            {site.resumeUrl && (
              <Magnetic href={site.resumeUrl} external className="underline-offset-8 hover:text-accent hover:underline">Résumé ↗</Magnetic>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-2 px-5 py-8 font-mono text-xs text-muted-foreground sm:flex-row sm:justify-between md:px-8">
          <span>© 2026 {site.name} · Designed & built with care</span>
          <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={links.github} {...ext} className="transition-colors hover:text-accent">
              GitHub ↗
            </a>
            <Clock />
          </span>
        </div>
      </footer>
    </div>
  );
}
