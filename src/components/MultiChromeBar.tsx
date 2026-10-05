import { AppLink } from "./AppLink";

/** Slim glass bar — demo switcher only. Replaces the tall SiteFooter on /m. */
export function MultiChromeBar() {
  return (
    <div className="multi-chrome">
      <div className="flex items-center justify-between gap-4">
        <p className="font-term text-[0.65rem] tracking-[0.2em] text-faint uppercase">
          Experiencia{" "}
          <AppLink href="/" className="text-accent underline-offset-2 hover:underline">
            clásica
          </AppLink>
          <span className="text-muted"> · MYRK multi</span>
        </p>
        <p className="hidden font-term text-[0.6rem] tracking-wide text-faint sm:block">
          Deslizá · cada sección, un umbral
        </p>
      </div>
    </div>
  );
}
