import { describe, expect, it } from "vitest";
import { readCssLengthPx } from "./cssLength";

describe("readCssLengthPx", () => {
  it("does not treat rem as raw pixels (parseFloat trap)", () => {
    expect(readCssLengthPx("4rem", 64)).toBe(64);
    expect(readCssLengthPx("4rem", 64)).not.toBe(4);
  });

  it("reads px and falls back on empty", () => {
    expect(readCssLengthPx("56px")).toBe(56);
    expect(readCssLengthPx("", 72)).toBe(72);
  });
});
