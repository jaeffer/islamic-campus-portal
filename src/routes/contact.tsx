import { createFileRoute } from "@tanstack/react-router";
import { Building2, Clock, MapPin, UserPlus } from "lucide-react";

import { PageHeader, PageShell } from "@/components/page-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Registration — Al Imam Hassan Quran Institute" },
      {
        name: "description",
        content:
          "Visit the madrasa at the Imam Hassan Mosque, Atena Tera, Kolfe, Addis Ababa. Office hours 2:00 to 12:30 local time.",
      },
      { property: "og:title", content: "Contact Al Imam Hassan Quran Institute" },
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
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <ul className="space-y-4">
          {details.map((d) => (
            <li key={d.label} className="card-surface flex items-start gap-4 p-5">
              <d.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t(d.label)}
                </div>
                <div className="mt-1 text-sm font-medium" dir={d.ltr ? "ltr" : undefined}>
                  {d.value}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <form
          className="card-surface space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              {t("form.name")}
            </label>
            <input
              id="name"
              required
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              {t("form.email")}
            </label>
            <input
              id="email"
              type="email"
              required
              dir="ltr"
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">
              {t("form.message")}
            </label>
            <textarea
              id="message"
              rows={5}
              required
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("form.send")}
          </button>
          <p className="text-xs text-muted-foreground">{t("form.note")}</p>
        </form>
      </section>
    </PageShell>
  );
}
