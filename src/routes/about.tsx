import { createFileRoute } from "@tanstack/react-router";

import hero2 from "@/assets/hero-2.jpg";
import { PageHeader, PageShell } from "@/components/page-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nur Al-Bayan Quran Institute — Mission & Story" },
      {
        name: "description",
        content:
          "Our story since 1996: certified teachers with connected isnad, character education, and close family communication.",
      },
      { property: "og:title", content: "About Nur Al-Bayan Quran Institute" },
      {
        property: "og:description",
        content: "A community Quran school where every student is known by name.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useI18n();
  const pillars = [
    { t: "about.missionT", b: "about.missionB" },
    { t: "about.visionT", b: "about.visionB" },
    { t: "about.valuesT", b: "about.valuesB" },
  ] as const;

  return (
    <PageShell>
      <PageHeader title={t("about.title")} subtitle={t("about.lead")} />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
        </div>
        <img
          src={hero2}
          alt="Quran study hall with wooden desks and shelves of mushaf copies"
          width={1920}
          height={1088}
          loading="lazy"
          className="h-72 w-full rounded-2xl object-cover shadow-lift sm:h-96"
        />
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-3">
        {pillars.map((p) => (
          <article key={p.t} className="card-surface p-6">
            <h2 className="font-display text-xl font-bold">{t(p.t)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(p.b)}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
