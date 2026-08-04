import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, PageShell } from "@/components/page-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Levels & Classes — Al Imam Hassan Mosque & Madereesa" },
      {
        name: "description",
        content:
          "KG, primary, secondary and tertiary levels plus darsi for youth, mothers and fathers — Quran, Hadith, Fiqh and Tawheed from age 4.",
      },
      { property: "og:title", content: "Levels at Al Imam Hassan Mosque & Madereesa" },
      {
        property: "og:description",
        content: "A path that starts at age 4 and continues for every age group.",
      },
    ],
  }),
  component: Programs,
});

function Programs() {
  const { t, lang } = useI18n();
  const items = [
    { t: "p1.title", b: "p1.body", meta: { en: "From age 4", am: "ከ4 ዓመት ጀምሮ", ar: "من سن الرابعة" } },
    {
      t: "p2.title",
      b: "p2.body",
      meta: { en: "Primary school students", am: "የፕራይመሪ ተማሪዎች", ar: "طلاب المرحلة الابتدائية" },
    },
    {
      t: "p3.title",
      b: "p3.body",
      meta: { en: "Secondary school students", am: "የሰከንደሪ ተማሪዎች", ar: "طلاب المرحلة الثانوية" },
    },
    {
      t: "p4.title",
      b: "p4.body",
      meta: { en: "University level", am: "የዩኒቨርሲቲ ደረጃ", ar: "المرحلة الجامعية" },
    },
    { t: "p5.title", b: "p5.body", meta: { en: "Youth", am: "ወጣቶች", ar: "الشباب" } },
    {
      t: "p6.title",
      b: "p6.body",
      meta: { en: "No age limit", am: "የእድሜ ገደብ የለውም", ar: "بلا حدّ للعمر" },
    },
    { t: "p7.title", b: "p7.body", meta: { en: "Coming soon", am: "በቅርቡ", ar: "قريباً" } },
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
