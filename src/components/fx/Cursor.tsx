import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/useReducedMotion";

export default function Cursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;
    setIsEnabled(true);
  }, []);

  useEffect(() => {
    if (!isEnabled || !dotRef.current || !ringRef.current) return;

    document.body.classList.add("fx-cursor-on");
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;

    const xTo = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });

    function onMove(event: PointerEvent) {
      gsap.set(dot, { x: event.clientX, y: event.clientY });
      xTo(event.clientX);
      yTo(event.clientY);
    }

    function onOver(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.closest("input, textarea, select, [contenteditable=true]")) {
        gsap.to(ring, { scale: 0, opacity: 0, duration: 0.2 });
        document.body.classList.remove("fx-cursor-on");
        if (label) label.textContent = "";
        return;
      }

      document.body.classList.add("fx-cursor-on");
      const cursorLabel = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorLabel) {
        gsap.to(ring, {
          scale: 80 / 36,
          backgroundColor: "transparent",
          borderColor: "var(--accent)",
          duration: 0.25,
        });
        if (label) label.textContent = cursorLabel;
        return;
      }

      if (target.closest("a, button, [role=button]")) {
        gsap.to(ring, {
          scale: 1.8,
          borderColor: "var(--accent)",
          duration: 0.25,
        });
        if (label) label.textContent = "";
        return;
      }

      gsap.to(ring, {
        scale: 1,
        borderColor: "currentColor",
        duration: 0.25,
      });
      if (label) label.textContent = "";
    }

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);

    return () => {
      document.body.classList.remove("fx-cursor-on");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="fx-cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--fg)",
          pointerEvents: "none",
          zIndex: 120,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="fx-cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid currentColor",
          color: "var(--fg)",
          pointerEvents: "none",
          zIndex: 120,
          mixBlendMode: "difference",
          display: "grid",
          placeItems: "center",
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: "var(--font-term)",
            fontSize: 10,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        />
      </div>
    </>
  );
}
