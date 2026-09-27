import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

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

  return (
    <div key={location.pathname} className={`multi-frame ${className}`.trim()}>
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
