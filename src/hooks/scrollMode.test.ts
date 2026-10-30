import { describe, expect, it } from "vitest";
import { resolveScrollMode } from "./scrollMode";

describe("resolveScrollMode", () => {
  it("uses the smooth engine on a desktop-class pointer", () => {
    expect(
      resolveScrollMode({ reducedMotion: false, finePointer: true, canHover: true }),
    ).toBe("smooth");
  });

  it("keeps native scrolling on a touch screen", () => {
    expect(
      resolveScrollMode({ reducedMotion: false, finePointer: false, canHover: false }),
    ).toBe("native");
  });

  it("keeps native scrolling when the pointer is fine but cannot hover (stylus)", () => {
    expect(
      resolveScrollMode({ reducedMotion: false, finePointer: true, canHover: false }),
    ).toBe("native");
  });

  it("keeps native scrolling when the visitor asked for reduced motion", () => {
    expect(
      resolveScrollMode({ reducedMotion: true, finePointer: true, canHover: true }),
    ).toBe("native");
  });
});
