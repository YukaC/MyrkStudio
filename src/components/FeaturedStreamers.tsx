import { useState } from "react";
import { STREAMERS, STREAMERS_SECTION } from "../content";
import type { FeaturedStreamer } from "../content";
import { EditorialCard } from "./editorial/EditorialCard";
import { EditorialScrollItem, EditorialScrollStagger } from "./editorial/EditorialScrollStagger";
import { LiveBadge } from "./icons";
import { SectionHeader } from "./SectionHeader";

const MC_HEADS_ORIGIN = "https://mc-heads.net";

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
      <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color-mix(in_srgb,var(--color-cream)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_65%,transparent)] sm:size-16">
        <span aria-hidden className="font-sans text-2xl leading-none font-semibold text-accent">
          {getInitials(streamer.displayName)}
        </span>
      </span>
    );
  }

  return (
    <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color-mix(in_srgb,var(--color-cream)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_65%,transparent)] sm:size-16">
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
  const rank = String(index + 1).padStart(2, "0");
  const body = (
    <>
      {streamer.isLive ? <LiveBadge /> : null}
      <span className="editorial-streamer-rank">{rank}</span>
      <StreamerAvatar streamer={streamer} />
      <span className="font-sans text-base font-semibold leading-snug text-cream uppercase">
        {streamer.displayName}
      </span>
      {streamer.tag ? (
        <span className="font-term text-[0.65rem] leading-snug tracking-wider text-cream/60 uppercase">
          {streamer.tag}
        </span>
      ) : null}
    </>
  );

  const cardClass = "relative flex h-full flex-col items-center gap-3 p-4 text-center";

  return streamer.url ? (
    <EditorialCard
      as="a"
      href={streamer.url}
      target="_blank"
      rel="noreferrer"
      scrollMotion={false}
      className={cardClass}
    >
      {body}
    </EditorialCard>
  ) : (
    <EditorialCard scrollMotion={false} className={cardClass}>
      {body}
    </EditorialCard>
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
          blurb={STREAMERS_SECTION.blurb}
        />

        <EditorialScrollStagger as="ol" className="grid grid-cols-2 gap-3 p-0 pt-2 sm:grid-cols-3" stagger={0.07}>
          {STREAMERS.map((streamer, index) => (
            <EditorialScrollItem key={streamer.displayName} as="li" className="h-full list-none">
              <StreamerCard streamer={streamer} index={index} />
            </EditorialScrollItem>
          ))}
        </EditorialScrollStagger>

        <p className="mt-4 text-sm text-cream/50">{STREAMERS_SECTION.note}</p>
      </div>
    </section>
  );
}
