import { useState } from "react";
import { accentStyle, STREAMERS, STREAMERS_SECTION } from "../content";
import type { FeaturedStreamer } from "../content";
import { LiveBadge } from "./icons";
import { SectionHeader } from "./SectionHeader";

const MC_HEADS_ORIGIN = "https://mc-heads.net";

/**
 * Session memory of the last URL that loaded for a streamer.
 * Survives remounts within the tab; local /avatars/* is the durable disk fallback.
 */
const avatarMemory = new Map<string, string>();

function buildAvatarCascade(streamer: FeaturedStreamer): string[] {
  const remembered = avatarMemory.get(streamer.displayName);
  const candidates = [
    remembered,
    streamer.avatarLive?.trim(),
    streamer.avatarSrc?.trim(),
    streamer.minecraftName?.trim()
      ? `${MC_HEADS_ORIGIN}/head/${encodeURIComponent(streamer.minecraftName.trim())}/128`
      : undefined,
  ];

  const seen = new Set<string>();
  const cascade: string[] = [];
  for (const url of candidates) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    cascade.push(url);
  }
  return cascade;
}

function getInitials(displayName: string): string {
  const words = displayName.split(/\s+/).filter(Boolean);
  const first = words[0]?.[0] ?? "?";
  const last = words.length > 1 ? (words[words.length - 1][0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}

function StreamerAvatar({ streamer }: { streamer: FeaturedStreamer }) {
  const cascade = buildAvatarCascade(streamer);
  const [step, setStep] = useState(0);
  const src = cascade[step] ?? null;

  if (!src) {
    return (
      <span className="avatar-ring flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-black/40 sm:size-16">
        <span aria-hidden className="font-display text-2xl leading-none font-semibold text-accent">
          {getInitials(streamer.displayName)}
        </span>
      </span>
    );
  }

  return (
    <span className="avatar-ring flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-black/40 sm:size-16">
      <img
        key={src}
        src={src}
        alt=""
        width={64}
        height={64}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="size-full object-cover"
        onLoad={() => {
          avatarMemory.set(streamer.displayName, src);
        }}
        onError={() => {
          setStep((current) => current + 1);
        }}
      />
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
            <span className="font-term text-[0.65rem] leading-snug tracking-wider break-words text-muted uppercase">
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
            <span className="font-term text-[0.65rem] leading-snug tracking-wider break-words text-muted uppercase">
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
    <section id="streamers" className="editorial-section section-block" aria-labelledby="streamers-title">
      <div className="page-shell">
        <SectionHeader
          index="07"
          titleId="streamers-title"
          title={STREAMERS_SECTION.title}
          log={STREAMERS_SECTION.log}
          blurbClassName="prose-muted mb-6 md:mb-8"
          blurb={STREAMERS_SECTION.blurb}
        />

        {/* pt-2: the live badge is -top-2, so it escapes the card upward by 8px */}
        <ol className="grid list-none grid-cols-2 gap-3 p-0 pt-2 sm:grid-cols-3">
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
