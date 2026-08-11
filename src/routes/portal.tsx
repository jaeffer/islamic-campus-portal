import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";

import { languages, nextLang, useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Staff Portal Sign In — Al Imam Hassan Mosque & Madereesa" },
      {
        name: "description",
        content:
          "Secure sign-in for ustadhs and administration to manage classes, attendance and student progress.",
      },
      { property: "og:title", content: "Staff Portal — Al Imam Hassan Mosque & Madereesa" },
      { property: "og:description", content: "Sign in to the madrasa staff portal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Portal,
});

function Portal() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const body = await res.json();

      if (!res.ok) {
        setError(body.message || body.error || "Invalid credentials. Please try again.");
        return;
      }

      const { accessToken, refreshToken, user } = body.data;
      const role = user.profileType?.toLowerCase() || 'admin';
      const screen = role === 'teacher' ? 'teacher_dashboard' : 'admin_dashboard';

      // Assemble Zustand app state format
      const appState = {
        state: {
          authenticated: true,
          userRole: role,
          currentScreen: screen,
          currentUser: {
            id: user.id,
            name: user.profile?.fullName || user.username,
            username: user.username,
          },
          currentLanguage: 'en',
          rtlMode: false,
        },
        version: 0,
      };

      // Redirect to school management dashboard with state payload in URL params
      const encoded = btoa(JSON.stringify(appState));
      window.location.href = `http://localhost:5173?auth=${encoded}`;
    } catch (err) {
      setError("Cannot reach the server. Make sure the backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src="/institute-1.jpg"
          alt="Al Imam Hassan mosque compound at golden hour"
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
            <img src="/logo.png" alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover shadow-sm" />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setLang(nextLang(lang))}
                className="rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold hover:bg-accent"
              >
                {languages.find((l) => l.code === nextLang(lang))?.label}
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

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-xs font-medium text-destructive">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="staff-id" className="text-sm font-medium">
                {t("portal.id")}
              </label>
              <input
                id="staff-id"
                required
                dir="ltr"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-input accent-primary"
              />
              {t("portal.remember")}
            </label>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <Lock className="h-4 w-4" />
              {loading ? "Signing in..." : t("portal.signin")}
            </button>
          </form>

          <p className="mt-3 text-xs text-muted-foreground">{t("portal.forgot")}</p>

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
