import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  DISCORD_URL,
  HERO,
  SERIES_NAME,
  STUDIO_NAME,
  WHITELIST_HREF,
  WHITELIST_INVITE_NOTE,
} from "../../content";
import { AppLink } from "../AppLink";
import { DiscordIcon } from "../icons";
import { Panel } from "../Panel";
import { PlazasMeter } from "../PlazasMeter";
import { PremiereCountdown } from "../PremiereCountdown";
import { StatCounters } from "../StatCounters";

type EditorialHeroProps = {
  whitelistHref?: string;
};

function HeroBackdrop() {
  const { backdrop } = HERO;
  return (
    <div className="editorial-hero-media" aria-hidden>
      <picture>
        <source media="(max-width: 640px)" srcSet={backdrop.webpSm} type="image/webp" />
        <source srcSet={backdrop.webp} type="image/webp" />
        <img
          src={backdrop.jpeg}
          alt=""
          width={backdrop.width}
          height={backdrop.height}
          decoding="async"
          fetchPriority="high"
          className="editorial-hero-image"
        />
      </picture>
      <div className="editorial-hero-scrim" />
    </div>
  );
}

export function EditorialHero({ whitelistHref = WHITELIST_HREF }: EditorialHeroProps) {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
      };

  return (
    <section id="top" ref={heroRef} className="editorial-hero">
      <HeroBackdrop />

      <div className="editorial-hero-copy page-shell">
        <motion.p className="editorial-hero-lede" {...motionProps}>
          {HERO.lede}
        </motion.p>

        <div className="editorial-hero-status">
          <span className="editorial-hero-badge">{HERO.statusLabel}</span>
        </div>
      </div>

      <div className="editorial-hero-wordmark-wrap page-shell">
        <motion.div
          className="editorial-hero-wordmark"
          style={reducedMotion ? undefined : { y: wordmarkY, opacity: wordmarkOpacity }}
          {...(reducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: "12%" },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 1, delay: 0.15, ease: [0.23, 1, 0.32, 1] as const },
              })}
        >
          <p className="editorial-hero-studio">{STUDIO_NAME.replace(" Studio", "")}</p>
          <p className="editorial-hero-studio-sub">Studio</p>
          <p className="editorial-hero-series">{SERIES_NAME}</p>
        </motion.div>
      </div>

      <div className="editorial-hero-panel-wrap page-shell">
        <motion.div
          className="editorial-hero-actions"
          {...(reducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.55, delay: 0.35 },
              })}
        >
          <AppLink href={whitelistHref} className="btn btn-primary editorial-cta">
            Postular
          </AppLink>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn btn-discord editorial-cta">
            <DiscordIcon />
            Discord
          </a>
        </motion.div>

        <Panel title="Plazas · estreno" badge="LIVE" badgeClassName="text-success" className="editorial-status-panel">
          <div className="space-y-4 p-4 sm:p-5">
            <PlazasMeter compact />
            <StatCounters />
            <p className="font-term text-[0.7rem] leading-relaxed text-muted">{WHITELIST_INVITE_NOTE}</p>
            <PremiereCountdown />
          </div>
        </Panel>
      </div>
    </section>
  );
}
