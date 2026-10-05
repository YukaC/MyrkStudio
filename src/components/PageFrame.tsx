import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import type { MultiLocationState } from "../hooks/useMultiSectionScroll";
import { useMyrkMultiChrome } from "../hooks/useMyrkMultiChrome";

type PageFrameProps = {
  children: ReactNode;
  /** Hero atmosphere (glow + grid). */
  withAtmosphere?: boolean;
  /**
   * When true, body scrolls inside the viewport (form/FAQ overflow).
   * Default false = one-screen, overflow clipped.
   */
  allowScroll?: boolean;
  className?: string;
};

/**
 * Multi-page viewport chrome: fills the shell under the nav,
 * remount-keyed so entrance motion re-fires on route change.
 * Wayfinding lives in the primary header nav — no secondary dock.
 */
export function PageFrame({
  children,
  withAtmosphere = true,
  allowScroll = false,
  className = "",
}: PageFrameProps) {
  const location = useLocation();
  const isMyrkMulti = useMyrkMultiChrome();
  const slide = (location.state as MultiLocationState | null)?.multiSlide;
  const enterClass =
    isMyrkMulti
      ? ""
      : slide === "next"
        ? "multi-frame--enter-next"
        : slide === "prev"
          ? "multi-frame--enter-prev"
          : "";

  return (
    <div
      key={location.pathname}
      className={["multi-frame", enterClass, className].filter(Boolean).join(" ")}
    >
      {withAtmosphere ? (
        <>
          <div className="hero-glow" aria-hidden />
          <div className="hero-grid" aria-hidden />
        </>
      ) : null}

      <div className="multi-frame-body" data-scroll={allowScroll ? "true" : "false"}>
        {children}
      </div>
    </div>
  );
}
