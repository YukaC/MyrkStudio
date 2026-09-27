import { describe, expect, it } from "vitest";
import indexHtml from "../../index.html?raw";
import * as content from "./index";
import { FAQ } from "./faq";
import { CTA_LABEL, FOOTER, NAV_LINKS } from "./nav";
import { PLAZAS, plazasMeterAriaLabel, plazasPercent } from "./plazas";
import { STAFF, STREAMERS } from "./studio";
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

describe("studio", () => {
  it("should derive STREAMERS from STAFF instead of keeping a parallel roster", () => {
    expect(STREAMERS).toHaveLength(STAFF.length);
    STREAMERS.forEach((streamer, index) => {
      const member = STAFF[index];
      expect(streamer.displayName).toBe(member.name);
      expect(streamer.tag).toBe(member.role);
      expect(streamer.url).toBe(member.twitter);
    });
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
  });

  it("should keep every nav href a unique in-page anchor", () => {
    const hrefs = NAV_LINKS.map((link) => link.href);
    expect(hrefs.every((href) => href.startsWith("#"))).toBe(true);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("should keep the footer free of a parallel sitemap", () => {
    expect(Object.keys(FOOTER).sort()).toEqual(["legal", "tagline"]);
  });

  it("should keep a single CTA label for header and footer", () => {
    expect(CTA_LABEL).toBe("Postular");
  });
});

describe("primary CTAs", () => {
  it("should keep Discord and the whitelist CTA only in the hero, the header and the closing banner", () => {
    const ctaFiles = Object.entries(componentSources)
      .filter(([, source]) => /href=\{DISCORD_URL\}|href="#whitelist"/.test(source))
      .map(([path]) => path.split("/").pop()?.replace(".tsx", ""))
      .sort();
    expect(ctaFiles).toEqual(["CtaBanner", "HeroSection", "SiteHeader"]);
  });

  it("should show Discord once per surface, the header one living in the mobile menu", () => {
    expect(countAnchors(/href=\{DISCORD_URL\}/g)).toBe(3);
  });

  it("should show the whitelist CTA once per surface, mobile/desktop pair aside", () => {
    expect(countAnchors(/href="#whitelist"/g)).toBe(4);
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
      "WEEK1_DAYS",
      "accentStyle",
      "STAFF",
      "STUDIO_STATEMENT",
      "STREAMERS",
      "STREAMERS_SECTION",
      "LORE_DOSSIER",
      "DOSSIER_ROWS",
      "FAQ",
      "FAQ_SECTION",
      "WHITELIST_STEPS",
      "WHITELIST_INVITE_NOTE",
      "getDemoInviteCodes",
      "isValidDemoInvite",
      "NAV_LINKS",
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
