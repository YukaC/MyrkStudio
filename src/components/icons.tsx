export function DiscordIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`${className} shrink-0`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

/** Three lines morph to X via CSS (data-open). Reduced-motion → snap in motion.css. */
export function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="menu-icon h-6 w-6"
      data-open={open ? "true" : "false"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        className="menu-icon-line menu-icon-line-top"
        strokeLinecap="round"
        strokeWidth={2}
        d="M4 7h16"
      />
      <path
        className="menu-icon-line menu-icon-line-mid"
        strokeLinecap="round"
        strokeWidth={2}
        d="M4 12h16"
      />
      <path
        className="menu-icon-line menu-icon-line-bot"
        strokeLinecap="round"
        strokeWidth={2}
        d="M4 17h16"
      />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-faint"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

/** Size and flex-shrink are appended after the caller's className on purpose: an
    inline svg with a viewBox and no width/height resolves to the 300x150
    replaced-element default, so a caller that restyles colour and motion must
    never be able to drop the box. This icon is the disclosure affordance, so its
    size is deliberately not overridable. */
export function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`${className} size-4 shrink-0`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

/** Dot colour reuses the tokens Tailwind already exposes; no new palette. */
const LIVE_TONE_CLASS = {
  accent: {
    frame: "border-[color-mix(in_srgb,var(--color-accent)_55%,var(--color-line))] text-accent",
    dot: "bg-accent",
  },
  success: {
    frame: "border-[color-mix(in_srgb,var(--color-success)_55%,var(--color-line))] text-success",
    dot: "bg-success",
  },
} as const;

export type LiveBadgeTone = keyof typeof LIVE_TONE_CLASS;

export function LiveBadge({ tone = "success" }: { tone?: LiveBadgeTone }) {
  const { frame, dot } = LIVE_TONE_CLASS[tone];

  return (
    <span
      className={`absolute -top-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 ${frame} bg-black/80 px-2 py-0.5 font-term text-[0.6rem] tracking-wider uppercase`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dot} opacity-75`} />
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dot}`} />
      </span>
      En vivo
    </span>
  );
}
