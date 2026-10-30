import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { DISCORD_URL, HERO, SERIES_NAME, STUDIO_NAME, WHITELIST_HREF } from "../../content";
import { DUR, EASE, gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/useReducedMotion";
import { AppLink } from "../AppLink";
import HeroEmblem from "../fx/HeroEmblem";
import { EditorialHeroSignal } from "./EditorialHeroSignal";

const HeroCanvas = lazy(() => import("../fx/HeroCanvas"));

type EditorialHeroProps = {
  whitelistHref?: string;
};

/**
 * The sky is the hero's only background: no still image sits behind it, so there
 * is nothing to swap out when the shader arrives. A device that cannot give us a
 * WebGL2 context gets the flat field instead of a photograph, and a visitor who
 * asked for reduced motion gets one frame of the same sky rather than a loop.
 */
function canUseHeroWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

export function EditorialHero({ whitelistHref = WHITELIST_HREF }: EditorialHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [useWebGL, setUseWebGL] = useState(false);
  const [inView, setInView] = useState(true);
  const reduced = prefersReducedMotion();
  // Reduced motion still gets the sky, just not a moving one: one frame, drawn on
  // demand, is the same composition with the loop removed.
  const frameloop = reduced ? "demand" : inView ? "always" : "never";

  useEffect(() => {
    setUseWebGL(canUseHeroWebGL());
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !useWebGL) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [useWebGL]);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero || reduced) return;

      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });

      const copy = copyRef.current;
      if (copy) {
        gsap.to(copy, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom 30%",
            scrub: true,
          },
        });
      }

      const runIntro = () => {
        const badge = hero.querySelector(".editorial-hero-badge");
        const studio = hero.querySelector(".editorial-hero-studio");
        const presents = hero.querySelector(".editorial-hero-presents");
        const series = hero.querySelector(".editorial-hero-series");
        const actions = hero.querySelector(".editorial-hero-actions");
        const signal = hero.querySelector(".editorial-hero-signal-wrap");
        const lede = hero.querySelector(".editorial-hero-lede");

        const targets = [lede, badge, studio, presents, series, actions, signal].filter(
          Boolean,
        ) as Element[];
        gsap.from(targets, {
          y: 28,
          opacity: 0,
          duration: DUR.base,
          ease: EASE,
          stagger: 0.15,
        });
      };

      let introPlayed = false;
      const onDone = () => {
        if (introPlayed) return;
        introPlayed = true;
        runIntro();
      };

      window.addEventListener("preloader:done", onDone);
      try {
        if (sessionStorage.getItem("pl") === "1" || prefersReducedMotion()) {
          onDone();
        }
      } catch {
        onDone();
      }

      return () => {
        window.removeEventListener("preloader:done", onDone);
      };
    },
    { scope: heroRef },
  );

  return (
    <section
      id="top"
      ref={heroRef}
      className="editorial-hero"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {useWebGL ? (
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
          <Suspense fallback={null}>
            <HeroCanvas scroll={scrollProgress} frameloop={frameloop} />
          </Suspense>
        </div>
      ) : null}

      <HeroEmblem />
      <div aria-hidden="true" className="hero-ridge" />

      <div ref={copyRef} className="hero-content" data-speed="0.9">
        <div className="editorial-hero-copy page-shell">
          <p className="editorial-hero-lede">{HERO.lede}</p>
          <div className="editorial-hero-status">
            <span className="editorial-hero-badge">{HERO.statusLabel}</span>
          </div>
        </div>

        <div className="editorial-hero-wordmark-wrap page-shell">
          <div className="editorial-hero-wordmark">
            <p className="editorial-hero-studio">{STUDIO_NAME}</p>
            <p className="editorial-hero-presents">{HERO.presentsLabel}</p>
            <p className="editorial-hero-series" data-split="lines">
              {SERIES_NAME}
            </p>
          </div>
        </div>

        <div className="editorial-hero-foot page-shell">
          <div className="editorial-hero-actions">
            <AppLink
              href={whitelistHref}
              className="editorial-btn editorial-btn-primary"
              data-magnetic=""
            >
              Postular
              <span aria-hidden> →</span>
            </AppLink>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="editorial-btn editorial-btn-outline"
              data-magnetic=""
            >
              Discord
            </a>
          </div>

          <div className="editorial-hero-signal-wrap">
            <EditorialHeroSignal />
          </div>
        </div>
      </div>
    </section>
  );
}
