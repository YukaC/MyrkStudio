import { describe, expect, it } from "vitest";
import indexHtml from "../../index.html?raw";
import * as content from "./index";
import { FAQ } from "./faq";
import { CTA_LABEL, FOOTER, MULTI_BASE, MULTI_NAV_LINKS, MULTI_SCROLL_PATHS, MULTI_WHITELIST_HREF, NAV_LINKS, WHITELIST_HREF } from "./nav";
import { PLAZAS, plazasMeterAriaLabel, plazasPercent } from "./plazas";
import {
  ESCALETA_VISIBLE_WEEKS,
  ESCALETA_WEEKS,
  getVisibleEscaletaWeeks,
} from "./series";
import { STAFF, STREAMERS, liveXAvatarUrl, twitterHandleFromUrl } from "./studio";
import { accentStyle } from "./ui";
import { getDemoInviteCodes, isValidDemoInvite } from "./whitelist";

/** Every component source at once so CTA repetition can be counted page-wide (§V15) */
const componentSources = import.meta.glob("../components/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function countAnchors(pattern: RegExp): number {
  return Object.values(componentSources).reduce(
    (total, source) => total + (source.match(pattern)?.length ?? 0),
    0,
  );
}

type QuestionNode = {
  "@type": string;
  name: string;
  acceptedAnswer: { text: string };
};

function isQuestionNode(value: unknown): value is QuestionNode {
  return (
    typeof value === "object" &&
    value !== null &&
    "@type" in value &&
    "name" in value &&
    "acceptedAnswer" in value
  );
}

/** The FAQ page keeps a 1:1 JSON-LD mirror in index.html; this reads it back (§V6). */
function readJsonLdQuestions(html: string): QuestionNode[] {
  const raw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  if (!raw) throw new Error("index.html has no application/ld+json block");
  const parsed: unknown = JSON.parse(raw);
  if (typeof parsed !== "object" || parsed === null || !("@graph" in parsed)) {
    throw new Error("index.html JSON-LD has no @graph");
  }
  const graph: unknown = (parsed as { "@graph": unknown })["@graph"];
  if (!Array.isArray(graph)) throw new Error("index.html JSON-LD @graph is not an array");
  const faqPage = graph.find(
    (node) => typeof node === "object" && node !== null && "mainEntity" in node,
  );
  const mainEntity: unknown = faqPage === undefined ? null : (faqPage as { mainEntity: unknown }).mainEntity;
  if (!Array.isArray(mainEntity)) throw new Error("index.html JSON-LD has no FAQPage mainEntity");
  return mainEntity.filter(isQuestionNode);
}

describe("plazas", () => {
  it("should derive the occupancy percentage from PLAZAS", () => {
    expect(plazasPercent()).toBe(Math.round((PLAZAS.occupied / PLAZAS.total) * 100));
  });

  it("should build the meter aria label from PLAZAS, never hand-typed", () => {
    expect(plazasMeterAriaLabel()).toBe(`${PLAZAS.occupied} de ${PLAZAS.total} plazas ocupadas`);
  });
});

describe("escaleta", () => {
  it("should model a 4-week event with 6 days and Main Event on day 6", () => {
    expect(ESCALETA_WEEKS).toHaveLength(4);
    ESCALETA_WEEKS.forEach((week) => {
      expect(week.days).toHaveLength(6);
      expect(week.days[5].detail).toBe("Main Event");
      expect(week.days[5].state).toBe("open");
      week.days.slice(1, 5).forEach((day) => {
        expect(day.state).toBe("corrupt");
      });
    });
  });

  it("should only expose weeks up to ESCALETA_VISIBLE_WEEKS", () => {
    expect(ESCALETA_VISIBLE_WEEKS).toBeGreaterThanOrEqual(1);
    expect(ESCALETA_VISIBLE_WEEKS).toBeLessThanOrEqual(ESCALETA_WEEKS.length);
    expect(getVisibleEscaletaWeeks()).toHaveLength(ESCALETA_VISIBLE_WEEKS);
    expect(getVisibleEscaletaWeeks(0)).toHaveLength(0);
    expect(getVisibleEscaletaWeeks(99)).toHaveLength(ESCALETA_WEEKS.length);
  });
});

describe("studio", () => {
  it("should derive STREAMERS from STAFF instead of keeping a parallel roster", () => {
    expect(STREAMERS).toHaveLength(STAFF.length);
    STREAMERS.forEach((streamer, index) => {
      const member = STAFF[index];
      expect(streamer.displayName).toBe(member.name);
      expect(streamer.tag).toBe(member.role);
      expect(streamer.url).toBe(member.twitter);
      expect(streamer.avatarSrc).toBe(member.avatarSrc);
      expect(member.avatarSrc.startsWith("/avatars/")).toBe(true);
      expect(streamer.avatarLive).toBe(liveXAvatarUrl(member.twitter));
    });
  });

  it("should resolve live X avatar URLs from staff twitter links", () => {
    expect(twitterHandleFromUrl("https://x.com/IAmKudaoficial")).toBe("IAmKudaoficial");
    expect(liveXAvatarUrl("https://x.com/IAmKudaoficial")).toBe(
      "https://unavatar.io/x/IAmKudaoficial",
    );
    expect(twitterHandleFromUrl("https://twitter.com/intent/tweet")).toBe(null);
  });
});

describe("whitelist invites", () => {
  it("should parse the demo invite codes from the csv env into a set", () => {
    expect(getDemoInviteCodes().has("WL-ALPHA")).toBe(true);
    expect(getDemoInviteCodes().has("wl-alpha")).toBe(false);
  });

  it("should accept invite codes case-insensitively and reject empty or unknown ones", () => {
    expect(isValidDemoInvite("wl-alpha")).toBe(true);
    expect(isValidDemoInvite("  NETFO-01  ")).toBe(true);
    expect(isValidDemoInvite("")).toBe(false);
    expect(isValidDemoInvite("   ")).toBe(false);
    expect(isValidDemoInvite("NO-EXISTE")).toBe(false);
  });
});

describe("nav", () => {
  it("should not list the whitelist anchor that the CTA already targets", () => {
    expect(NAV_LINKS.map((link) => link.href)).not.toContain("#whitelist");
    expect(MULTI_NAV_LINKS.map((link) => link.href)).not.toContain(MULTI_WHITELIST_HREF);
  });

  it("should keep every classic nav href a unique in-page anchor", () => {
    const hrefs = NAV_LINKS.map((link) => link.href);
    expect(hrefs.every((href) => href.startsWith("#"))).toBe(true);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("should keep every multi nav href under /m with unique paths", () => {
    const hrefs = MULTI_NAV_LINKS.map((link) => link.href);
    expect(hrefs.every((href) => href.startsWith(`${MULTI_BASE}/`))).toBe(true);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs).toEqual([
      `${MULTI_BASE}/serie`,
      `${MULTI_BASE}/lore`,
      `${MULTI_BASE}/escaleta`,
      `${MULTI_BASE}/estudio`,
      `${MULTI_BASE}/staff`,
      `${MULTI_BASE}/canales`,
      `${MULTI_BASE}/faq`,
    ]);
  });

  it("should keep the footer free of a parallel sitemap", () => {
    expect(Object.keys(FOOTER).sort()).toEqual(["legal", "tagline"]);
  });

  it("should keep a single CTA label for header and footer", () => {
    expect(CTA_LABEL).toBe("Postular");
  });

  it("should order multi scroll paths as home → sections → whitelist", () => {
    expect(MULTI_SCROLL_PATHS[0]).toBe(MULTI_BASE);
    expect(MULTI_SCROLL_PATHS.at(-1)).toBe(MULTI_WHITELIST_HREF);
    expect(MULTI_SCROLL_PATHS.slice(1, -1)).toEqual(MULTI_NAV_LINKS.map((link) => link.href));
  });

  it("should expose distinct whitelist targets per demo variant", () => {
    expect(WHITELIST_HREF).toBe("#whitelist");
    expect(MULTI_WHITELIST_HREF).toBe(`${MULTI_BASE}/whitelist`);
  });
});

describe("primary CTAs", () => {
  it("should keep Discord and the whitelist CTA only in the hero, the header and the closing banner", () => {
    const ctaFiles = Object.entries(componentSources)
      .filter(([, source]) => /href=\{DISCORD_URL\}|whitelistHref/.test(source))
      .map(([path]) => path.split("/").pop()?.replace(".tsx", ""))
      .sort();
    expect(ctaFiles).toEqual(["CtaBanner", "HeroSection", "SiteHeader"]);
  });

  it("should show Discord once per surface, the header one living in the mobile menu", () => {
    expect(countAnchors(/href=\{DISCORD_URL\}/g)).toBe(3);
  });

  it("should show the whitelist CTA once per surface, mobile/desktop pair aside", () => {
    // SiteHeader ×2 (desktop+mobile) · Hero ×1 · CtaBanner ×1
    expect(countAnchors(/href=\{whitelistHref\}/g)).toBe(4);
  });
});

describe("accent tokens", () => {
  it("should cycle per-card accents from the shared token list", () => {
    expect(accentStyle(0)["--card-accent"]).toBe("var(--color-accent)");
    expect(accentStyle(5)["--card-accent"]).toBe(accentStyle(0)["--card-accent"]);
  });
});

describe("faq", () => {
  it("should mirror the FAQ entries 1:1 in the index.html FAQPage JSON-LD", () => {
    const nodes = readJsonLdQuestions(indexHtml);
    expect(nodes).toHaveLength(FAQ.length);
    FAQ.forEach((entry, index) => {
      expect(nodes[index]["@type"]).toBe("Question");
      expect(nodes[index].name).toBe(entry.question);
      expect(nodes[index].acceptedAnswer.text).toBe(entry.answer);
    });
  });
});

describe("barrel contract", () => {
  it("should re-export every content domain through index.ts", () => {
    const symbols = [
      "SITE_URL",
      "DISCORD_URL",
      "STUDIO_NAME",
      "SERIES_NAME",
      "SEO",
      "PLAZAS",
      "plazasPercent",
      "plazasMeterAriaLabel",
      "PREMIERE_DATE",
      "PREMIERE",
      "SERIES_FEATURES",
      "ESCALETA_SECTION",
      "ESCALETA_WEEKS",
      "ESCALETA_VISIBLE_WEEKS",
      "getVisibleEscaletaWeeks",
      "WEEK1_DAYS",
      "accentStyle",
      "STAFF",
      "STUDIO_STATEMENT",
      "STREAMERS",
      "STREAMERS_SECTION",
      "liveXAvatarUrl",
      "twitterHandleFromUrl",
      "LORE_DOSSIER",
      "DOSSIER_ROWS",
      "FAQ",
      "FAQ_SECTION",
      "WHITELIST_STEPS",
      "WHITELIST_INVITE_NOTE",
      "getDemoInviteCodes",
      "isValidDemoInvite",
      "NAV_LINKS",
      "MULTI_NAV_LINKS",
      "MULTI_BASE",
      "MULTI_SCROLL_PATHS",
      "WHITELIST_HREF",
      "MULTI_WHITELIST_HREF",
      "FOOTER",
      "CTA_LABEL",
      "HERO",
      "NOTICE",
      "absoluteUrl",
    ] as const;

    const missing = symbols.filter((symbol) => (content as Record<string, unknown>)[symbol] === undefined);
    expect(missing).toEqual([]);
  });
});
