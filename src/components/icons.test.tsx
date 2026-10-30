import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { EditorialNav } from "./editorial/EditorialNav";
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

describe("editorial nav", () => {
  it("should render a sized menu icon in the mobile chrome", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/"]}>
        <EditorialNav />
      </MemoryRouter>,
    );
    const menuMatch = html.match(
      /editorial-nav-menu-btn[\s\S]*?<svg[^>]*class="([^"]*)"/,
    );

    expect(menuMatch?.[1]).toMatch(/size-4|h-4|h-5|h-6|w-6/);
  });
});
