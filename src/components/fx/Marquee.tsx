import { useEffect, useMemo, useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/useReducedMotion";
import { useLenis } from "./SmoothScroll";

type MarqueeProps = {
  text?: string;
};

const DEFAULT_TEXT =
  "SUPERVIVENCIA · FACCIONES · EVENTOS GUIONIZADOS · ZONA CERO · ";

export default function Marquee({ text = DEFAULT_TEXT }: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenis();
  const content = useMemo(() => text.repeat(4), [text]);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !trackRef.current) return;
      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "none",
      });

      const lenis = lenisRef.current;
      if (!lenis) return () => {
        tween.kill();
      };

      const onScroll = (payload: { velocity: number }) => {
        const scale = 1 + Math.abs(payload.velocity) * 0.3;
        tween.timeScale(scale);
        if (Math.abs(payload.velocity) < 0.05) {
          gsap.to(tween, { timeScale: 1, duration: 0.6 });
        }
      };
      lenis.on("scroll", onScroll);
      return () => {
        lenis.off("scroll", onScroll);
        tween.kill();
      };
    },
    { scope: rootRef },
  );

  useEffect(() => {
    /* Lenis may mount after first paint; noop — tween still runs. */
  }, []);

  return (
    <div
      ref={rootRef}
      className="fx-marquee"
      aria-hidden
      style={{
        overflow: "hidden",
        borderBlock: "1px solid var(--line)",
        paddingBlock: "0.75rem",
        color: "var(--fg-muted)",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: "max-content",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-term)",
          fontSize: "clamp(3rem, 8vw, 7rem)",
          lineHeight: 1,
          WebkitTextStroke: "1px var(--fg-muted)",
          color: "transparent",
        }}
      >
        <span>{content}</span>
        <span>{content}</span>
      </div>
    </div>
  );
}
