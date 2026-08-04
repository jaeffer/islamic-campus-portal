import { createFileRoute } from "@tanstack/react-router";
import { Building2, Clock, MapPin, UserPlus } from "lucide-react";

import { PageHeader, PageShell } from "@/components/page-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Registration — Al Imam Hassan Mosque &amp; Madereesa" },
      {
        name: "description",
        content:
          "Visit the madrasa at the Imam Hassan Mosque, Atena Tera, Kolfe, Addis Ababa. Office hours 2:00 to 12:30 local time.",
      },
      { property: "og:title", content: "Contact Al Imam Hassan Mosque &amp; Madereesa" },
      {
        property: "og:description",
        content: "Reach the administration for registration and enquiries.",
      },
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
      </section>
    </PageShell>
  );
}
