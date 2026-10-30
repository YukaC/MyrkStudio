type MyrkStudioMarkProps = {
  className?: string;
};

/**
 * Studio seal: M over a horizontal YR, K below.
 * Instrument Serif — fashion editorial, only on the mark.
 */
export function MyrkStudioMark({ className = "" }: MyrkStudioMarkProps) {
  const letterStyle = { fontFamily: '"Instrument Serif", "Cormorant Garamond", serif' };

  return (
    <svg
      className={className}
      viewBox="0 0 78 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="39" cy="60" rx="35" ry="56" stroke="currentColor" strokeWidth="1.15" />
      <text
        x="39"
        y="42"
        textAnchor="middle"
        fill="currentColor"
        fontSize="40"
        fontWeight="400"
        style={letterStyle}
      >
        M
      </text>
      <text
        x="21"
        y="74"
        textAnchor="middle"
        fill="currentColor"
        fontSize="34"
        fontWeight="400"
        style={letterStyle}
      >
        Y
      </text>
      <text
        x="57"
        y="74"
        textAnchor="middle"
        fill="currentColor"
        fontSize="34"
        fontWeight="400"
        style={letterStyle}
      >
        R
      </text>
      <text
        x="39"
        y="106"
        textAnchor="middle"
        fill="currentColor"
        fontSize="40"
        fontWeight="400"
        style={letterStyle}
      >
        K
      </text>
    </svg>
  );
}
