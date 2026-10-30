import type { RefObject } from "react";
import { DUR, EASE, gsap, ScrollTrigger, SplitText, useGSAP } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/useReducedMotion";

function setupMagnetic(el: HTMLElement) {
  const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
  const onMove = (event: PointerEvent) => {
    const r = el.getBoundingClientRect();
    xTo((event.clientX - (r.left + r.width / 2)) * 0.25);
    yTo((event.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const onLeave = () => {
    xTo(0);
    yTo(0);
  };
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);
  return () => {
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerleave", onLeave);
  };
}

function setupTilt(el: HTMLElement) {
  const parent = el.parentElement;
  if (parent) parent.style.perspective = "900px";
  el.style.transformStyle = "preserve-3d";
  const rotX = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power3" });
  const rotY = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3" });
  const onMove = (event: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const px = (event.clientX - r.left) / r.width;
    const py = (event.clientY - r.top) / r.height;
    rotY((px - 0.5) * 10);
    rotX(-(py - 0.5) * 10);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
    el.style.willChange = "transform";
  };
  const onLeave = () => {
    rotX(0);
    rotY(0);
    el.style.willChange = "auto";
  };
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);
  return () => {
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerleave", onLeave);
  };
}

export function useScrollFx(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const cleanups: Array<() => void> = [];

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.dataset.reveal === "img") {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)", scale: 1.25 },
            {
              clipPath: "inset(0)",
              scale: 1,
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          );
          return;
        }
        const kids = el.dataset.reveal === "stagger" ? Array.from(el.children) : el;
        gsap.from(kids, {
          y: 40,
          opacity: 0,
          duration: DUR.base,
          ease: EASE,
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-split='lines']").forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: EASE,
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            });
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = Number.parseFloat(el.dataset.speed || "1");
        gsap.to(el, {
          yPercent: (1 - speed) * 30,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-scramble]").forEach((el) => {
        const finalText = el.textContent || "";
        gsap.to(el, {
          duration: 1.2,
          ease: "none",
          scrambleText: {
            text: finalText,
            chars: "█▓▒░/\\|<>_#",
            speed: 0.6,
            revealDelay: 0.2,
          },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });

        if (el.hasAttribute("data-corrupt-glitch")) {
          gsap.to(el, {
            duration: 0.6,
            repeat: -1,
            repeatDelay: 3,
            scrambleText: { text: finalText, chars: "█▓▒░#@%" },
          });
        }
      });

      const finePointer = window.matchMedia("(pointer: fine)").matches;
      if (finePointer) {
        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
          cleanups.push(setupMagnetic(el));
        });
        gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
          cleanups.push(setupTilt(el));
        });
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const days = gsap.utils.toArray<HTMLElement>("#escaleta [data-day]");
        if (!days.length) return;
        gsap.set(days, { opacity: 0.2, y: 16 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#escaleta",
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(days, { opacity: 1, y: 0, duration: 0.5, ease: "none", stagger: 0.18 })
          .fromTo(
            "#escaleta [data-progress]",
            { scaleY: 0 },
            { scaleY: 1, ease: "none", duration: 0.18 * days.length + 0.5 },
            0,
          )
          .to({}, { duration: 0.25 });
      });

      const sectionRules: HTMLElement[] = [];
      gsap.utils.toArray<HTMLElement>(".editorial-section").forEach((section) => {
        if (section.querySelector(".fx-section-rule")) return;
        const line = document.createElement("div");
        line.className = "fx-section-rule";
        line.setAttribute("aria-hidden", "true");
        section.prepend(line);
        sectionRules.push(line);
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: EASE,
            transformOrigin: "left center",
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          },
        );
      });

      const onFontsReady = () => {
        void ScrollTrigger.refresh();
      };
      void document.fonts.ready.then(onFontsReady);
      window.addEventListener("load", onFontsReady);

      return () => {
        window.removeEventListener("load", onFontsReady);
        mm.revert();
        cleanups.forEach((fn) => fn());
        sectionRules.forEach((line) => line.remove());
      };
    },
    { scope: root },
  );
}
