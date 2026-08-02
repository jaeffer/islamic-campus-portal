import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { PageHeader, PageShell } from "@/components/page-shell";
import { useI18n } from "@/lib/i18n";

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
        content: "What families ask us most before registering their children.",
      },
    ],
  }),
  component: Faq,
});

const items = [1, 2, 3, 4, 5, 6];

function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(1);

  return (
    <PageShell>
      <PageHeader title={t("faq.title")} subtitle={t("faq.sub")} />
      <section className="mx-auto max-w-3xl space-y-3 px-4 py-16 sm:px-6">
        {items.map((n) => {
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
      </section>
    </PageShell>
  );
}
