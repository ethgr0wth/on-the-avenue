/**
 * One-shot NETROWS → approved-listings seeder.
 * - `runSeedIfNeeded()` is called on server boot. It no-ops once seed:done flag is set.
 * - `runSeed({ force })` is called by an admin route to re-run / extend.
 * Dedupe is by NETROWS place_id (Google Maps stable id) so reruns add new
 * businesses without duplicating.
 */
import { logger } from "../logger";
import { getStorage } from "./storage";
import { k } from "./keys";
import { searchPlaces } from "./places";
import { seedBusiness } from "./repo";

export interface SeedResult {
  query: string;
  fetched: number;
  inserted: number;
  skipped: number;
  errors: string[];
}

async function doSeed(query: string): Promise<SeedResult> {
  const s = getStorage();
  const places = await searchPlaces(query, 20);
  const out: SeedResult = {
    query,
    fetched: places.length,
    inserted: 0,
    skipped: 0,
    errors: [],
  };
  for (const p of places) {
    try {
      const existingId = await s.get(k.seedByPlace(p.placeId));
      if (existingId) {
        out.skipped++;
        continue;
      }
      const biz = await seedBusiness({
        name: p.name,
        category: p.category,
        description: p.description,
        address: p.address,
        phone: p.phone,
        website: p.website,
        hours: p.hours,
        imageUrl: p.imageUrl,
        rating: p.rating,
        reviewCount: p.reviewCount,
        priceTier: p.priceTier,
      });
      await s.set(k.seedByPlace(p.placeId), biz.id);
      out.inserted++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      out.errors.push(`${p.name}: ${msg}`);
    }
  }
  return out;
}

export async function runSeed(opts: { force?: boolean; query?: string } = {}): Promise<SeedResult> {
  const raw = opts.query ?? process.env.OTA_SEED_QUERY ?? "";
  const queries = raw.split(/\s*[,;|]\s*/).map((q) => q.trim()).filter(Boolean);
  if (queries.length === 0) {
    return { query: "", fetched: 0, inserted: 0, skipped: 0, errors: ["OTA_SEED_QUERY not set"] };
  }
  if (!process.env.NETROWS_API_KEY) {
    return { query: raw, fetched: 0, inserted: 0, skipped: 0, errors: ["NETROWS_API_KEY not set"] };
  }
  const combined: SeedResult = { query: queries.join(" | "), fetched: 0, inserted: 0, skipped: 0, errors: [] };
  for (const q of queries) {
    try {
      const r = await doSeed(q);
      combined.fetched += r.fetched;
      combined.inserted += r.inserted;
      combined.skipped += r.skipped;
      combined.errors.push(...r.errors);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      combined.errors.push(`[${q}] ${msg}`);
    }
  }
  // Only mark "done" if we actually inserted something, so a transient
  // upstream outage doesn't permanently block the boot-time seeder.
  if (!opts.force && combined.inserted > 0) {
    await getStorage().set(k.seedDone(), new Date().toISOString());
  }
  return combined;
}

/** Called from the server entrypoint. Safe to call repeatedly. */
export async function runSeedIfNeeded(): Promise<void> {
  const s = getStorage();
  const done = await s.get(k.seedDone());
  if (done) {
    logger.info({ seededAt: done }, "ota seed: already done, skipping");
    return;
  }
  if (!process.env.OTA_SEED_QUERY || !process.env.NETROWS_API_KEY) {
    logger.info(
      {
        hasQuery: !!process.env.OTA_SEED_QUERY,
        hasKey: !!process.env.NETROWS_API_KEY,
      },
      "ota seed: env not configured, skipping",
    );
    return;
  }
  try {
    logger.info({ query: process.env.OTA_SEED_QUERY }, "ota seed: starting");
    const result = await runSeed();
    logger.info(result, "ota seed: complete");
  } catch (err) {
    logger.error({ err }, "ota seed: failed");
  }
}
