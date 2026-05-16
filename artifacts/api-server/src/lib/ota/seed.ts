/**
 * One-shot Google Places → approved-listings seeder.
 * - `runSeedIfNeeded()` is called on server boot. It no-ops once seed:done flag is set.
 * - `runSeed({ force })` is called by an admin route to re-run / extend.
 * Dedupe is by Google Place ID so reruns add new businesses without duplicating.
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
      // Dedup: skip if we've already imported this place id
      const existingId = await s.get(k.seedByPlace(p.placeId));
      if (existingId) {
        out.skipped++;
        continue;
      }
      const biz = await seedBusiness({
        name: p.name,
        category: p.category,
        address: p.address,
        phone: p.phone,
        website: p.website,
        hours: p.hours,
        imageUrl: p.imageUrl,
        tagline: p.rating != null ? `★ ${p.rating.toFixed(1)} on Google` : null,
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
  const query = opts.query ?? process.env.OTA_SEED_QUERY ?? "";
  if (!query) {
    return { query: "", fetched: 0, inserted: 0, skipped: 0, errors: ["OTA_SEED_QUERY not set"] };
  }
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    return { query, fetched: 0, inserted: 0, skipped: 0, errors: ["GOOGLE_PLACES_API_KEY not set"] };
  }
  const result = await doSeed(query);
  if (!opts.force) {
    await getStorage().set(k.seedDone(), new Date().toISOString());
  }
  return result;
}

/** Called from the server entrypoint. Safe to call repeatedly. */
export async function runSeedIfNeeded(): Promise<void> {
  const s = getStorage();
  const done = await s.get(k.seedDone());
  if (done) {
    logger.info({ seededAt: done }, "ota seed: already done, skipping");
    return;
  }
  if (!process.env.OTA_SEED_QUERY || !process.env.GOOGLE_PLACES_API_KEY) {
    logger.info(
      {
        hasQuery: !!process.env.OTA_SEED_QUERY,
        hasKey: !!process.env.GOOGLE_PLACES_API_KEY,
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
