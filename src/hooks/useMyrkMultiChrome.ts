import { useLocation } from "react-router-dom";
import { MULTI_BASE } from "../content";

/** True on `/m` and `/m/*` — MYRK multi-page chrome (classic `/` stays unchanged). */
export function useMyrkMultiChrome(): boolean {
  const { pathname } = useLocation();
  return pathname === MULTI_BASE || pathname.startsWith(`${MULTI_BASE}/`);
}
