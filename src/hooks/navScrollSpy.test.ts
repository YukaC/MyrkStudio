import { describe, expect, it } from "vitest";
import { NAV_LINKS } from "../content/nav";
import { resolveNavScrollStates } from "./navScrollSpy";

function mockSection(top: number) {
  return {
    getBoundingClientRect: () => ({
      top,
      bottom: top + 400,
      left: 0,
      right: 0,
      width: 0,
      height: 400,
    }),
  } as HTMLElement;
}

describe("resolveNavScrollStates", () => {
  it("marks all links future before the first section crosses the probe", () => {
    const getSectionById = (id: string) => (id === "serie" ? mockSection(200) : null);

    const states = resolveNavScrollStates(NAV_LINKS, 100, getSectionById);
    for (const link of NAV_LINKS) {
      expect(states[link.href]).toBe("future");
    }
  });

  it("lights active and past links as sections scroll past the probe", () => {
    const tops: Record<string, number> = {
      serie: -20,
      estudio: 80,
      staff: 300,
      streamers: 500,
      faq: 700,
    };
    const getSectionById = (id: string) => (id in tops ? mockSection(tops[id]) : null);

    const states = resolveNavScrollStates(NAV_LINKS, 120, getSectionById);
    expect(states["#serie"]).toBe("past");
    expect(states["#estudio"]).toBe("active");
    expect(states["#staff"]).toBe("future");
  });
});
