import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type AppLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

/**
 * Hash and http(s) stay as <a>; in-app paths use RR <Link> (no page wipe).
 * Router paths get aria-current="page" when they match the location.
 */
export function AppLink({ href, className, children, onClick }: AppLinkProps) {
  const location = useLocation();
  const isRouterPath = href.startsWith("/") && !href.startsWith("//");

  if (!isRouterPath) {
    return (
      <a href={href} className={className} onClick={onClick}>
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
    >
      {children}
    </Link>
  );
}
