import { useEffect, useRef, useState } from "react";
import { DUR, EASE_IN_OUT, gsap, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/useReducedMotion";
import { useLenis } from "./SmoothScroll";

const LINES = [
  "> ESTABLECIENDO SEÑAL...",
  "> DESCIFRANDO ARCHIVO [ZONA CERO]",
  "> ACCESO PARCIAL CONCEDIDO",
] as const;

function shouldSkipPreloader(): boolean {
  if (prefersReducedMotion()) return true;
  try {
    return sessionStorage.getItem("pl") === "1";
  } catch {
    return false;
  }
}

export default function Preloader() {
  const [isMounted, setIsMounted] = useState(() => !shouldSkipPreloader());
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lenisRef = useLenis();

  useEffect(() => {
    if (!isMounted) {
      window.dispatchEvent(new Event("preloader:done"));
      return;
    }
    const lenis = lenisRef.current;
    lenis?.stop();
    return () => {
      lenis?.start();
    };
  }, [isMounted, lenisRef]);

  useGSAP(
    () => {
      if (!isMounted || !rootRef.current) return;

      const counter = { v: 0 };
      const lineEls = gsap.utils.toArray<HTMLElement>("[data-pl-line]", rootRef.current);
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem("pl", "1");
          } catch {
            /* ignore quota / private mode */
          }
          gsap.to(rootRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: EASE_IN_OUT,
            onComplete: () => {
              lenisRef.current?.start();
              window.dispatchEvent(new Event("preloader:done"));
              setIsMounted(false);
            },
          });
        },
      });

      tl.from(lineEls, {
        opacity: 0,
        y: 8,
        stagger: 0.35,
        duration: DUR.fast,
        ease: "power2.out",
      }).to(
        counter,
        {
          v: 100,
          duration: 2.2,
          ease: "none",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            }
          },
        },
        0,
      );
    },
    { scope: rootRef, dependencies: [isMounted] },
  );

  if (!isMounted) return null;

  return (
    <div
      ref={rootRef}
      className="fx-preloader"
      data-preloader=""
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: "var(--font-term)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem",
        gap: "0.75rem",
      }}
    >
      {LINES.map((line) => (
        <p key={line} data-pl-line="" style={{ margin: 0, letterSpacing: "0.04em" }}>
          {line}
        </p>
      ))}
      <p data-pl-line="" style={{ margin: 0, color: "var(--accent)" }}>
        <span ref={counterRef}>000</span>
        <span aria-hidden> %</span>
      </p>
    </div>
  );
}
