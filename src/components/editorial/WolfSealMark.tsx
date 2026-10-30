import { useId } from "react";

type WolfSealMarkProps = {
  className?: string;
};

/**
 * Nav seal — monochrome wolf yin-yang + runic ring.
 * Pre-keyed mask PNG (ink = white, bg removed) paints as currentColor.
 */
export function WolfSealMark({ className = "" }: WolfSealMarkProps) {
  const maskId = `wolf-seal-mask-${useId().replace(/:/g, "")}`;

  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="120"
          height="120"
        >
          <image
            href="/marks/wolf-seal-mask.png"
            x="0"
            y="0"
            width="120"
            height="120"
            preserveAspectRatio="xMidYMid meet"
          />
        </mask>
      </defs>

      <rect width="120" height="120" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
}
