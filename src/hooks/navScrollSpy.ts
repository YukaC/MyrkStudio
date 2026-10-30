import type { NavLinkItem } from "../content/nav";

export type NavScrollState = "future" | "past" | "active";

/** Which nav anchor matches scroll position (probe = px from viewport top). */
export function resolveNavScrollStates(
  links: readonly NavLinkItem[],
  probeY: number,
  getSectionById: (id: string) => HTMLElement | null = (id) => document.getElementById(id),
): Record<string, NavScrollState> {
  let activeHref: string | null = null;

  for (const link of links) {
    if (!link.href.startsWith("#")) continue;
    const section = getSectionById(link.href.slice(1));
    if (!section) continue;
    if (section.getBoundingClientRect().top <= probeY) {
      activeHref = link.href;
    }
  }

  const activeIndex =
    activeHref === null ? -1 : links.findIndex((entry) => entry.href === activeHref);

  const states: Record<string, NavScrollState> = {};
  for (let index = 0; index < links.length; index++) {
    const link = links[index];
    if (activeIndex < 0) {
      states[link.href] = "future";
    } else if (index < activeIndex) {
      states[link.href] = "past";
    } else if (index === activeIndex) {
      states[link.href] = "active";
    } else {
      states[link.href] = "future";
    }
  }

  return states;
}
