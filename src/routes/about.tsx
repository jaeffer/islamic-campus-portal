import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, PageShell } from "@/components/page-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Al Imam Hassan Mosque & Madereesa — Mission & Story" },
      {
        name: "description",
        content:
          "Founded in 2003 E.C. by the Al Imam Hassan mosque community in Kolfe, Addis Ababa, so children gain deen knowledge without interrupting school.",
      },
      { property: "og:title", content: "About Al Imam Hassan Mosque & Madereesa" },
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
          src="/institute-3.jpg"
          alt="The Al Imam Hassan Mosque & Madereesa building surrounded by gardens"
          width={1920}
          height={1088}
          loading="lazy"
          className="h-72 w-full rounded-2xl object-cover shadow-lift sm:h-96"
        />
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-12 sm:px-6 md:grid-cols-3">
        {pillars.map((p) => (
          <article key={p.t} className="card-surface p-6">
            <h2 className="font-display text-xl font-bold">{t(p.t)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(p.b)}</p>
          </article>
        ))}
      </section>

      <section className="border-t border-border bg-card/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("admissions.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("admissions.sub")}</p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { titleKey: "admissions.whoT", bodyKey: "admissions.whoB" },
              { titleKey: "admissions.reqT", bodyKey: "admissions.reqB" },
              { titleKey: "admissions.docT", bodyKey: "admissions.docB" },
              { titleKey: "admissions.procT", bodyKey: "admissions.procB" },
              { titleKey: "admissions.examT", bodyKey: "admissions.examB" },
              { titleKey: "admissions.periodT", bodyKey: "admissions.periodB" },
              { titleKey: "admissions.feesT", bodyKey: "admissions.feesB" },
              {
                titleKey: "admissions.contactT",
                bodyKey: "admissions.contactB",
                isPhone: true,
              },
            ].map((item) => (
              <article key={item.titleKey} className="card-surface flex flex-col justify-between p-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{t(item.titleKey)}</h3>
                  {item.isPhone ? (
                    <a
                      href={`tel:${t(item.bodyKey)}`}
                      className="mt-2 inline-block font-mono text-base font-semibold text-primary hover:underline"
                    >
                      {t(item.bodyKey)}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(item.bodyKey)}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
