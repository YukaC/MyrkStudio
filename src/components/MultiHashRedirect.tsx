import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MULTI_BASE } from "../content";

/** Legacy single-page hashes → multi-page paths when under /m */
const HASH_TO_PATH: Record<string, string> = {
  "#serie": `${MULTI_BASE}/serie`,
  "#estudio": `${MULTI_BASE}/estudio`,
  "#staff": `${MULTI_BASE}/staff`,
  "#streamers": `${MULTI_BASE}/canales`,
  "#faq": `${MULTI_BASE}/faq`,
  "#whitelist": `${MULTI_BASE}/whitelist`,
  "#top": MULTI_BASE,
};

/**
 * If someone lands on /m#serie (bookmark from the classic demo), send them to
 * the real route. Instant — no transition.
 */
export function MultiHashRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.hash) return;
    const target = HASH_TO_PATH[location.hash];
    if (!target) return;
    navigate(target, { replace: true });
  }, [location.hash, navigate]);

  return null;
}
