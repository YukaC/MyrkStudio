import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import type { NavScrollState } from "../hooks/navScrollSpy";

type AppLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  navScrollState?: NavScrollState;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children" | "onClick">;

/**
 * Hash and http(s) stay as <a>; in-app paths use RR <Link> (no page wipe).
 * Router paths get aria-current="page" when they match the location.
 */
export function AppLink({
  href,
  className,
  children,
  onClick,
  navScrollState,
  ...rest
}: AppLinkProps) {
  const location = useLocation();
  const isRouterPath = href.startsWith("/") && !href.startsWith("//");
  const hashAriaCurrent = navScrollState === "active" ? ("location" as const) : undefined;

  if (!isRouterPath) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        aria-current={hashAriaCurrent}
        data-nav-state={navScrollState}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const isCurrent =
    location.pathname === href ||
    (href !== "/" && href !== "/m" && location.pathname.startsWith(`${href}/`));

  return (
    <Link
      to={href}
      className={className}
      onClick={onClick}
      aria-current={isCurrent ? "page" : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
}
