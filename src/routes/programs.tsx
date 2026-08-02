import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, PageShell } from "@/components/page-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Hifz, Tajweed, Islamic Studies & Kids Foundation" },
      {
        name: "description",
        content:
          "Structured Quran tracks for every age: full hifz, tajweed and recitation, Islamic studies, and a gentle kids foundation course.",
      },
      { property: "og:title", content: "Programs at Nur Al-Bayan Quran Institute" },
      {
        property: "og:description",
        content: "Tracks from first letters to a full ijazah in recitation.",
      },
    ],
  }),
  component: Programs,
});

function Programs() {
  const { t, lang } = useI18n();
  const items = [
    { t: "p1.title", b: "p1.body", meta: { en: "Ages 10+ · 5 days/week", ar: "من ١٠ سنوات · ٥ أيام أسبوعياً" } },
    { t: "p2.title", b: "p2.body", meta: { en: "All ages · 3 days/week", ar: "كل الأعمار · ٣ أيام أسبوعياً" } },
    { t: "p3.title", b: "p3.body", meta: { en: "Ages 12+ · 2 days/week", ar: "من ١٢ سنة · يومان أسبوعياً" } },
    { t: "p4.title", b: "p4.body", meta: { en: "Ages 5–9 · 4 days/week", ar: "٥–٩ سنوات · ٤ أيام أسبوعياً" } },
  ] as const;

  return (
    <PageShell>
      <PageHeader title={t("programs.title")} subtitle={t("programs.sub")} />
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-16 sm:px-6 md:grid-cols-2">
        {items.map((p) => (
          <article key={p.t} className="card-surface flex flex-col p-6">
            <h2 className="font-display text-xl font-bold">{t(p.t)}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t(p.b)}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {p.meta[lang]}
            </p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
