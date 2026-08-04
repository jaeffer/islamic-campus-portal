import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ChevronDown, Clock, HelpCircle, Users } from "lucide-react";
import { useState } from "react";

import { PageHeader, PageShell } from "@/components/page-shell";
import { useI18n } from "@/lib/i18n";

const groups = [
  { key: "faq.ages", icon: Users, items: [1, 2] },
  { key: "faq.learning", icon: BookOpen, items: [3, 4, 5] },
  { key: "faq.practical", icon: Clock, items: [6] },
] as const;

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Ages, Levels & Class Times | Al Imam Hassan" },
      {
        name: "description",
        content:
          "Answers about the minimum age of 4, the KG to tertiary levels, subjects taught, level-matched kitabs and class hours.",
      },
      { property: "og:title", content: "Frequently Asked Questions — Al Imam Hassan" },
      {
        property: "og:description",
        content: "What families ask us most before visiting the madrasa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Faq,
});

function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(1);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [1, 2, 3, 4, 5, 6].map((n) => ({
      "@type": "Question",
      name: t(`faq.q${n}`),
      acceptedAnswer: { "@type": "Answer", text: t(`faq.a${n}`) },
    })),
  };

  return (
    <PageShell>
      <PageHeader title={t("faq.title")} subtitle={t("faq.lead")} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          <div className="space-y-10">
            {groups.map((g) => (
              <div key={g.key}>
                <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                  <g.icon className="h-4.5 w-4.5 text-primary" />
                  {t(g.key)}
                </h2>
                <div className="mt-4 space-y-3">
                  {g.items.map((n) => {
                    const isOpen = open === n;
                    return (
                      <div key={n} className="card-surface overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : n)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center gap-3 px-5 py-4 text-start"
                        >
                          <span className="flex-1 font-display text-base font-bold sm:text-lg">
                            {t(`faq.q${n}`)}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {isOpen && (
                          <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                            {t(`faq.a${n}`)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <aside className="card-surface h-fit p-6 lg:sticky lg:top-24">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="mt-3 font-display text-xl font-bold">{t("faq.stillT")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("faq.stillB")}</p>
            <Link
              to="/contact"
              className="mt-5 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("nav.contact")}
            </Link>
            <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
              <li>
                <Link to="/programs" className="text-foreground/80 hover:text-primary">
                  {t("nav.programs")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/80 hover:text-primary">
                  {t("nav.about")}
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-secondary">
        <div className="pattern-grid pointer-events-none absolute inset-0 text-primary" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </PageShell>
  );
}
