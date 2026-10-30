import { useId, type CSSProperties } from "react";

type Rect = readonly [x: number, y: number, w: number, h: number];

/** Square stitch — keep the band low so it reads as a hairline, not a stripe. */
const CELL = 2;
const TILE_W = 16;
const TILE_H = 21;

export const GUARDAPAMPA_BAND_H = TILE_H * CELL;

const CX = 8;
const CY = 10;

function addDiamond(cells: Set<string>, inner: number, outer: number) {
  for (let dy = -outer; dy <= outer; dy++) {
    for (let dx = -outer; dx <= outer; dx++) {
      const distance = Math.abs(dx) + Math.abs(dy);
      if (distance >= inner && distance <= outer) {
        cells.add(`${CX + dx},${CY + dy}`);
      }
    }
  }
}

function addNordicStar(cells: Set<string>, radius: number) {
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const distance = Math.abs(dx) + Math.abs(dy);
      const onAxis = dx === 0 || dy === 0;
      const onDiagonal = Math.abs(dx) === Math.abs(dy);
      if (distance <= radius && (onAxis || onDiagonal)) {
        cells.add(`${CX + dx},${CY + dy}`);
      }
    }
  }
}

function motifRuns(): Rect[] {
  const cells = new Set<string>();

  for (let x = 0; x < TILE_W; x++) {
    if (x % 2 === 0) {
      cells.add(`${x},0`);
      cells.add(`${x},${TILE_H - 1}`);
    }
    cells.add(`${x},1`);
    cells.add(`${x},${TILE_H - 2}`);
  }

  addDiamond(cells, 6, 7);
  addNordicStar(cells, 4);

  const byRow = new Map<number, number[]>();
  for (const key of cells) {
    const [x, y] = key.split(",").map(Number);
    const row = byRow.get(y);
    if (row) row.push(x);
    else byRow.set(y, [x]);
  }

  const runs: Rect[] = [];
  for (const [y, xs] of byRow) {
    xs.sort((a, b) => a - b);
    let start = xs[0] ?? 0;
    let previous = start;
    for (let index = 1; index <= xs.length; index++) {
      const x = xs[index];
      if (x !== previous + 1) {
        runs.push([start, y, previous - start + 1, 1]);
        start = x ?? 0;
        previous = start;
      } else {
        previous = x;
      }
    }
  }

  return runs;
}

const MOTIF_RUNS = motifRuns();

function RectRuns({ runs, className }: { runs: readonly Rect[]; className: string }) {
  return (
    <g className={className} shapeRendering="crispEdges">
      {runs.map(([x, y, w, h]) => (
        <rect
          key={`${className}-${x}-${y}`}
          x={x * CELL}
          y={y * CELL}
          width={w * CELL}
          height={h * CELL}
        />
      ))}
    </g>
  );
}

type GuardapampaPatternProps = {
  className?: string;
  /** Fixed band height (divider) or `"100%"` to tile vertically (nav). */
  height?: number | "100%";
};

/** Tileable guardapampa SVG — shared by section dividers and nav chrome. */
export function GuardapampaPattern({ className = "", height = GUARDAPAMPA_BAND_H }: GuardapampaPatternProps) {
  const patternId = useId().replace(/:/g, "");
  const svgStyle =
    height === "100%"
      ? ({ height: "100%", minHeight: `${GUARDAPAMPA_BAND_H}px` } satisfies CSSProperties)
      : undefined;

  return (
    <svg
      className={className}
      style={svgStyle}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height={height === "100%" ? "100%" : height}
      preserveAspectRatio={height === "100%" ? "none" : undefined}
    >
      <defs>
        <pattern
          id={patternId}
          width={TILE_W * CELL}
          height={GUARDAPAMPA_BAND_H}
          patternUnits="userSpaceOnUse"
        >
          <rect className="guardapampa-ground" width={TILE_W * CELL} height={GUARDAPAMPA_BAND_H} />
          <RectRuns runs={MOTIF_RUNS} className="guardapampa-motif" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
