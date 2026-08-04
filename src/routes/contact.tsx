import { createFileRoute } from "@tanstack/react-router";
import { Building2, Clock, MapPin, Navigation, UserPlus } from "lucide-react";

import { PageHeader, PageShell } from "@/components/page-shell";
import { useI18n } from "@/lib/i18n";

const MAP_QUERY = "Imam Hassan Mosque, Atena Tera, Kolfe, Addis Ababa, Ethiopia";
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Visit — Al Imam Hassan Mosque & Madereesa" },
      {
        name: "description",
        content:
          "Visit the madrasa inside the Al Imam Hassan Medressa compound, Atena Tera, Kolfe, Addis Ababa. Office hours 2:00 to 12:30 local time.",
      },
      { property: "og:title", content: "Contact Al Imam Hassan Mosque & Madereesa" },
      {
        property: "og:description",
        content: "Find us on the map and reach the administration for enquiries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();

  const details = [
    { icon: MapPin, label: "contact.address", value: t("contact.addressV") },
    { icon: Building2, label: "contact.place", value: t("contact.placeV") },
    { icon: Clock, label: "contact.hours", value: t("contact.hoursV") },
    { icon: UserPlus, label: "contact.reg", value: t("contact.regV") },
  ] as const;

  return (
    <PageShell>
      <PageHeader title={t("contact.title")} subtitle={t("contact.sub")} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2">
          {details.map((d) => (
            <li key={d.label} className="card-surface flex items-start gap-4 p-5">
              <d.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t(d.label)}
                </div>
                <div className="mt-1 text-sm font-medium">{d.value}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">{t("contact.map")}</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t("contact.mapSub")}</p>
            </div>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
            >
              <Navigation className="h-4 w-4 text-primary" />
              {t("contact.directions")}
            </a>
          </div>
          <div className="card-surface mt-6 overflow-hidden p-0">
            <iframe
              title={t("contact.map")}
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[22rem] w-full border-0 sm:h-[28rem]"
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
