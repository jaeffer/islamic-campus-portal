import { createFileRoute } from "@tanstack/react-router";

import institute3 from "@/assets/institute-3.jpg.asset.json";
import { PageHeader, PageShell } from "@/components/page-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Al Imam Hassan Mosque &amp; Madereesa — Mission & Story" },
      {
        name: "description",
        content:
          "Founded in 2003 E.C. by the Al Imam Hassan mosque community in Kolfe, Addis Ababa, so children gain deen knowledge without interrupting school.",
      },
      { property: "og:title", content: "About Al Imam Hassan Mosque &amp; Madereesa" },
      {
        property: "og:description",
        content: "Our story, vision, mission and core values.",
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
          <p>{t("about.p3")}</p>
        </div>
        <img
          src={institute3.url}
          alt="The Al Imam Hassan Mosque &amp; Madereesa building surrounded by gardens"
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
