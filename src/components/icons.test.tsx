import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { FaqSection } from "./FaqSection";
import { ChevronIcon, DiscordIcon, LockIcon } from "./icons";

function renderedClasses(element: React.ReactElement): string[] {
  const match = renderToStaticMarkup(element).match(/class="([^"]*)"/);
  return match?.[1].split(/\s+/) ?? [];
}

describe("icons keep their box", () => {
  it("should hold size and shrink when the caller restyles colour and motion", () => {
    const classes = renderedClasses(
      <ChevronIcon className="faq-chevron mt-0.5 text-faint group-open:rotate-180" />,
    );

    expect(classes).toContain("size-4");
    expect(classes).toContain("shrink-0");
  });

  it("should let the caller resize the discord mark without losing shrink-0", () => {
    const classes = renderedClasses(<DiscordIcon className="h-4 w-4" />);

    expect(classes).toContain("h-4");
    expect(classes).toContain("shrink-0");
  });

  it("should mark the lock as a non-shrinkable flex child", () => {
    expect(renderedClasses(<LockIcon />)).toContain("shrink-0");
  });
});

describe("faq disclosure", () => {
  it("should keep every chevron sized, since a bare viewBox svg falls back to 300x150", () => {
    const svgClassLists = [
      ...renderToStaticMarkup(
        <MemoryRouter initialEntries={["/"]}>
          <FaqSection />
        </MemoryRouter>,
      ).matchAll(/<svg[^>]*class="([^"]*)"/g),
    ].map((match) => match[1]);

    expect(svgClassLists.length).toBeGreaterThan(0);

    for (const classList of svgClassLists) {
      expect(classList).toContain("size-4");
    }
  });
});

