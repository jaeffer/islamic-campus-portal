import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";

import hero1 from "@/assets/hero-1.jpg";
import logoAsset from "@/assets/logo.png.asset.json";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Staff Portal Sign In — Al Imam Hassan Quran Institute" },
      {
        name: "description",
        content:
          "Secure sign-in for ustadhs and administration to manage classes, attendance and student progress.",
      },
      { property: "og:title", content: "Staff Portal — Al Imam Hassan Quran Institute" },
      { property: "og:description", content: "Sign in to the madrasa staff portal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Portal,
});

function Portal() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src={hero1}
          alt="Courtyard of the institute at golden hour"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="absolute bottom-12 px-12">
          <h2 className="font-display text-3xl font-bold text-on-hero">{t("school.name")}</h2>
          <p className="mt-2 max-w-md text-sm text-on-hero-muted">{t("footer.tag")}</p>
        </div>
      </div>

      <div className="flex flex-col justify-center bg-background px-6 py-14 sm:px-14">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center justify-between">
            <img src={logoAsset.url} alt="" width={44} height={44} className="h-11 w-11" />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "am" : "en")}
                className="rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold hover:bg-accent"
              >
                {lang === "en" ? "አማርኛ" : "EN"}
              </button>
              <button
                type="button"
                onClick={toggle}
                aria-label={t("theme.toggle")}
                className="rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold hover:bg-accent"
              >
                {theme === "dark" ? "☀" : "☾"}
              </button>
            </div>
          </div>

          <h1 className="font-display text-3xl font-bold">{t("portal.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("portal.sub")}</p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="staff-id" className="text-sm font-medium">
                {t("portal.id")}
              </label>
              <input
                id="staff-id"
                required
                dir="ltr"
                className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                {t("portal.password")}
              </label>
              <input
                id="password"
                type="password"
                required
                dir="ltr"
                className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Lock className="h-4 w-4" />
              {t("portal.signin")}
            </button>
          </form>

          <p className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-secondary p-3 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {t("portal.pending")}
          </p>

          <Link
            to="/"
            className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
          >
            ← {t("portal.back")}
          </Link>
        </div>
      </div>
    </div>
  );
}
