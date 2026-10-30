import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { detectScrollMode } from "../../hooks/scrollMode";
import { gsap, ScrollTrigger } from "../../lib/gsap";

const LenisCtx = createContext<{ current: Lenis | null }>({ current: null });
export const useLenis = () => useContext(LenisCtx);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    // Touch + reduced-motion visitors keep native scrolling: see hooks/scrollMode.ts.
    if (detectScrollMode() !== "smooth") return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    ref.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    function onAnchorClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href^="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!(el instanceof HTMLElement)) return;
      event.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    }

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ref.current = null;
    };
  }, []);

  return <LenisCtx.Provider value={ref}>{children}</LenisCtx.Provider>;
}
