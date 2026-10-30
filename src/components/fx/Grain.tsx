import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../../lib/useReducedMotion";

function buildGrainDataUrl(): string {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const image = ctx.createImageData(256, 256);
  for (let i = 0; i < image.data.length; i += 4) {
    const v = Math.floor(Math.random() * 255);
    image.data[i] = v;
    image.data[i + 1] = v;
    image.data[i + 2] = v;
    image.data[i + 3] = 128;
  }
  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL("image/png");
}

export default function Grain() {
  const [url, setUrl] = useState<string | null>(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    setUrl(buildGrainDataUrl());
  }, []);

  if (!url) return null;

  return (
    <>
      <div
        className="fx-vignette"
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 59,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.55) 100%)",
        }}
      />
      <div
        className={`fx-grain${reduced ? "" : " is-animated"}`}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          pointerEvents: "none",
          opacity: 0.06,
          mixBlendMode: "overlay",
          backgroundImage: `url(${url})`,
          backgroundSize: "256px 256px",
        }}
      />
    </>
  );
}
