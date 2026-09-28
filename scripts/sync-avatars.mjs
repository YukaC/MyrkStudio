#!/usr/bin/env node
/**
 * Sync local /public/avatars fallbacks from unavatar (X).
 * Writes a file only when the downloaded bytes differ from disk.
 *
 * Usage: node scripts/sync-avatars.mjs
 * Cost: free unavatar tier (~1 req per staff member).
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STUDIO_TS = path.join(ROOT, "src/content/studio.ts");
const PUBLIC_DIR = path.join(ROOT, "public");

function dayKey() {
  return new Date().toISOString().slice(0, 10);
}

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

function twitterHandleFromUrl(twitterUrl) {
  const match = twitterUrl
    .trim()
    .match(/^https?:\/\/(?:www\.)?(?:x|twitter)\.com\/([^/?#]+)/i);
  const handle = match?.[1];
  if (!handle || handle === "i" || handle === "intent" || handle === "home") {
    return null;
  }
  return handle;
}

/** Parse STAFF twitter + avatarSrc pairs from studio.ts (single source). */
function parseStaffAvatars(source) {
  const blockMatch = source.match(/export const STAFF[^=]*=\s*\[([\s\S]*?)\n\];/);
  if (!blockMatch) {
    throw new Error("Could not find STAFF array in studio.ts");
  }
  const entries = [];
  const pairRe = /twitter:\s*"([^"]+)"[\s\S]*?avatarSrc:\s*"([^"]+)"/g;
  let match;
  while ((match = pairRe.exec(blockMatch[1])) !== null) {
    entries.push({ twitter: match[1], avatarSrc: match[2] });
  }
  if (entries.length === 0) {
    throw new Error("No STAFF avatar entries parsed from studio.ts");
  }
  return entries;
}

async function readExistingHash(filePath) {
  try {
    const buf = await readFile(filePath);
    return sha256(buf);
  } catch (error) {
    if (error && error.code === "ENOENT") return null;
    throw error;
  }
}

async function fetchAvatar(handle) {
  const url = `https://unavatar.io/x/${encodeURIComponent(handle)}?v=${dayKey()}`;
  const response = await fetch(url, {
    headers: { Accept: "image/*" },
    redirect: "follow",
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  const type = response.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) {
    throw new Error(`Expected image, got ${type || "unknown"} for ${url}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const source = await readFile(STUDIO_TS, "utf8");
  const staff = parseStaffAvatars(source);
  let updated = 0;
  let unchanged = 0;
  let failed = 0;

  for (const member of staff) {
    const handle = twitterHandleFromUrl(member.twitter);
    const rel = member.avatarSrc.replace(/^\//, "");
    const dest = path.join(PUBLIC_DIR, rel);

    if (!handle) {
      console.error(`skip ${rel}: bad twitter URL ${member.twitter}`);
      failed += 1;
      continue;
    }

    try {
      const bytes = await fetchAvatar(handle);
      const nextHash = sha256(bytes);
      const prevHash = await readExistingHash(dest);

      if (prevHash === nextHash) {
        console.log(`ok   ${rel} (@${handle}) — unchanged`);
        unchanged += 1;
        continue;
      }

      await mkdir(path.dirname(dest), { recursive: true });
      await writeFile(dest, bytes);
      console.log(
        prevHash
          ? `upd  ${rel} (@${handle}) — photo changed`
          : `new  ${rel} (@${handle}) — created`,
      );
      updated += 1;
    } catch (error) {
      failed += 1;
      console.error(`fail ${rel} (@${handle}): ${error.message}`);
    }
  }

  console.log(
    `\ndone: ${updated} updated, ${unchanged} unchanged, ${failed} failed`,
  );
  if (failed > 0) process.exitCode = 1;
}

main();
