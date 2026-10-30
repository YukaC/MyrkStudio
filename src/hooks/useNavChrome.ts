import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/useReducedMotion";

/** Top reading progress + hide-on-scroll-down chrome for the editorial nav. */
export function useNavChrome(headerRef: RefObject<HTMLElement | null>) {
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    let bar = document.querySelector<HTMLDivElement>(".fx-read-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "fx-read-progress";
      bar.setAttribute("aria-hidden", "true");
      document.body.appendChild(bar);
    }
    progressRef.current = bar;
    return () => {
      bar?.remove();
    };
  }, []);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const bar = progressRef.current;
    if (bar) {
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }

    const header = headerRef.current;
    if (!header) return;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self: ScrollTrigger) => {
        if (self.direction === 1 && self.scroll() > 120) {
          header.style.transform = "translateY(-110%)";
        } else {
          header.style.transform = "translateY(0)";
        }
        header.style.transition = "transform 0.35s var(--ease-out), backdrop-filter 0.35s";
      },
    });
  }, [headerRef]);
}
