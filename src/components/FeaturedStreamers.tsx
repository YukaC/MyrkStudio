import { accentStyle, STREAMERS, STREAMERS_SECTION } from "../content";
import type { FeaturedStreamer } from "../content";

const MC_HEADS_ORIGIN = "https://mc-heads.net";

/** Only resolves for published profiles; the crew fallback is the monogram */
function resolveAvatarUrl(minecraftName: string | undefined): string | null {
  const username = minecraftName?.trim();
  if (!username) return null;
  return `${MC_HEADS_ORIGIN}/head/${encodeURIComponent(username)}/128`;
}

function getInitials(displayName: string): string {
  const words = displayName.split(/\s+/).filter(Boolean);
  const first = words[0]?.[0] ?? "?";
  const last = words.length > 1 ? (words[words.length - 1][0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}

function StreamerAvatar({ streamer }: { streamer: FeaturedStreamer }) {
  const avatarUrl = resolveAvatarUrl(streamer.minecraftName);

  return (
    <span className="avatar-ring flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-black/40 sm:size-16">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt=""
          width={64}
          height={64}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="size-full object-cover"
        />
      ) : (
        <span aria-hidden className="font-display text-2xl leading-none font-semibold text-accent">
          {getInitials(streamer.displayName)}
        </span>
      )}
    </span>
  );
}

function LiveBadge() {
  return (
    <span className="absolute -top-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 border border-[color-mix(in_srgb,var(--color-success)_55%,var(--color-line))] bg-black/80 px-2 py-0.5 font-term text-[0.6rem] tracking-wider text-success uppercase">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
      </span>
      En vivo
    </span>
  );
}

function StreamerCard({ streamer, index }: { streamer: FeaturedStreamer; index: number }) {
  const rank = `#${String(index + 1).padStart(2, "0")}`;
  const cardClass =
    "card-accent panel relative flex h-full flex-col items-center gap-3 p-4 text-center";

  return (
    <li className="h-full">
      {streamer.url ? (
        <a
          href={streamer.url}
          target="_blank"
          rel="noreferrer"
          className={cardClass}
          style={accentStyle(index)}
        >
          {streamer.isLive ? <LiveBadge /> : null}
          <span className="font-term text-[0.65rem] tracking-[0.14em] text-faint">{rank}</span>
          <StreamerAvatar streamer={streamer} />
          <span className="font-display text-sm font-semibold leading-snug text-white uppercase">
            {streamer.displayName}
          </span>
          {streamer.tag ? (
            <span className="font-term text-[0.65rem] leading-snug tracking-wider text-muted uppercase">
              {streamer.tag}
            </span>
          ) : null}
        </a>
      ) : (
        <div className={cardClass} style={accentStyle(index)}>
          {streamer.isLive ? <LiveBadge /> : null}
          <span className="font-term text-[0.65rem] tracking-[0.14em] text-faint">{rank}</span>
          <StreamerAvatar streamer={streamer} />
          <span className="font-display text-sm font-semibold leading-snug text-white uppercase">
            {streamer.displayName}
          </span>
          {streamer.tag ? (
            <span className="font-term text-[0.65rem] leading-snug tracking-wider text-muted uppercase">
              {streamer.tag}
            </span>
          ) : null}
        </div>
      )}
    </li>
  );
}

export function FeaturedStreamers() {
  return (
    <section id="streamers" className="section-block" aria-labelledby="streamers-title">
      <div className="page-shell">
        <p className="log-label mb-2">
          [LOG] <b>Cobertura</b> // en vivo
        </p>
        <h2 id="streamers-title" className="section-title">
          {STREAMERS_SECTION.title}
        </h2>
        <p className="prose-muted mb-6 md:mb-8">{STREAMERS_SECTION.blurb}</p>

        <ol className="grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3">
          {STREAMERS.map((streamer, index) => (
            <StreamerCard key={streamer.displayName} streamer={streamer} index={index} />
          ))}
        </ol>

        <p className="mt-4 font-term text-[0.7rem] tracking-wide text-faint">
          {STREAMERS_SECTION.note}
        </p>
      </div>
    </section>
  );
}
