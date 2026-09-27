import { MULTI_HOME_PATHS, MULTI_HOME_PATHS_LABEL } from "../content";
import { AppLink } from "./AppLink";

/**
 * Quiet editorial cues under multi-home CTAs — not a second navbar.
 * Job: suggest narrative order. Full map = header MULTI_NAV_LINKS.
 */
export function HomeExplore() {
  return (
    <nav aria-label={MULTI_HOME_PATHS_LABEL} className="multi-explore reveal reveal-delay-3">
      <p className="multi-explore-label">{MULTI_HOME_PATHS_LABEL}</p>
      <ul className="multi-explore-list">
        {MULTI_HOME_PATHS.map((path) => (
          <li key={path.href}>
            <AppLink href={path.href} className="multi-explore-link">
              {path.label}
            </AppLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
