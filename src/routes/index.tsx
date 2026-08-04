import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, GraduationCap, HeartHandshake, Users } from "lucide-react";

import { HeroBackdrop } from "@/components/hero-backdrop";
import { HeroQuote } from "@/components/hero-quote";
import { PageShell } from "@/components/page-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al Imam Hassan Mosque & Madereesa — Quran & Islamic Studies" },
      {
        name: "description",
        content:
          "A Quran madrasa in Kolfe, Addis Ababa, teaching children from age 4 up to university level, plus darsi for youth, mothers and fathers.",
      },
      { property: "og:title", content: "Al Imam Hassan Mosque & Madereesa" },
      {
        property: "og:description",
        content: "Deen knowledge alongside school, for every age — since 2003 E.C.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "4+", key: "stats.students", icon: Users },
  { value: "7", key: "stats.teachers", icon: GraduationCap },
  { value: "5+", key: "stats.huffaz", icon: BookOpen },
  { value: "2003", key: "stats.years", icon: HeartHandshake },
] as const;

const programs = [
  { t: "p1.title", b: "p1.body" },
  { t: "p2.title", b: "p2.body" },
  { t: "p3.title", b: "p3.body" },
  { t: "p4.title", b: "p4.body" },
  { t: "p5.title", b: "p5.body" },
  { t: "p6.title", b: "p6.body" },
] as const;

function Home() {
  const { t } = useI18n();

  return (
    <PageShell>
      <HeroBackdrop>
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-40 sm:px-6">
          <div className="max-w-2xl">
            <img src="/logo.png" alt="" width={64} height={64} className="mb-6 h-16 w-16 rounded-full object-cover shadow-lift" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-on-hero sm:text-6xl">
              {t("school.name")}
            </h1>
            <div className="relative">
              <HeroQuote />
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-on-hero-muted sm:text-base">
              {t("hero.sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5"
              >
                {t("hero.cta1")}
              </Link>
              <Link
                to="/programs"
                className="rounded-lg border border-on-hero/40 px-6 py-3 text-sm font-semibold text-on-hero backdrop-blur-sm transition-colors hover:bg-on-hero/10"
              >
                {t("hero.cta2")}
              </Link>
            </div>
          </div>
        </div>
      </HeroBackdrop>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.key} className="flex items-start gap-3">
              <s.icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <div className="font-display text-3xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground sm:text-sm">{t(s.key)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("programs.title")}</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("programs.sub")}</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {programs.map((p) => (
            <article key={p.t} className="card-surface p-6 transition-transform hover:-translate-y-1">
              <h3 className="font-display text-xl font-bold">{t(p.t)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(p.b)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-secondary">
        <div className="pattern-grid pointer-events-none absolute inset-0 text-primary" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{t("cta.title")}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t("cta.sub")}</p>
          </div>
          <Link
            to="/contact"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
          >
            {t("hero.cta1")}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
