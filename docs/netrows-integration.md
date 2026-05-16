# NETROWS Integration Guide

A drop-in recipe for seeding a Replit app with real local businesses (name, address, phone, website, rating, review count, price tier, hours, photo) using the NETROWS API. NETROWS wraps Google Maps + Yelp + ~55 other sources behind one bearer-token API; we only need its Google Maps text-search endpoint.

This is the exact pattern used in production by the **On the Avenue** Park Avenue neighborhood guide — 100+ real businesses seeded on first boot, dedupe by Google Maps `place_id`.

---

## 1. Secret

Add one environment secret to the Repl:

| Name | Value |
| --- | --- |
| `NETROWS_API_KEY` | Your NETROWS bearer token |

In Replit: open **Secrets**, add `NETROWS_API_KEY`. Do not commit it.

---

## 2. The adapter — `lib/places.ts`

This is the only file that talks to NETROWS. It:

- Hits `GET https://api.netrows.com/v1/google-maps/search?query=...` with a `Bearer` token
- Retries on transient `SERVICE_UNAVAILABLE` errors (NETROWS sometimes rate-limits its upstream)
- Maps human-readable Google Maps category strings (`"Pizza restaurant"`, `"Beauty salon"`) into your own coarse categories
- Returns a clean `PlaceResult[]` you can persist however you like

```ts
// lib/places.ts
const NETROWS_SEARCH_URL = "https://api.netrows.com/v1/google-maps/search";

export interface PlaceResult {
  placeId: string;
  name: string;
  category: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  hours: string | null;       // NETROWS "open_state", e.g. "Open ⋅ Closes 9 PM"
  imageUrl: string | null;     // googleusercontent CDN URL
  rating: number | null;       // 0–5
  reviewCount: number | null;
  priceTier: string | null;    // "$", "$$", "$10–20", etc.
}

// Map NETROWS' detailed category strings to your app's coarse buckets.
// First regex hit wins. Tune to your product.
const CATEGORY_RULES: Array<[RegExp, string]> = [
  [/coffee|caf[eé]|espresso/i, "Cafés"],
  [/bakery|patisserie|donut|doughnut|ice cream|gelato|dessert/i, "Bakeries"],
  [/bar|pub|lounge|nightclub|brewery|wine|cocktail|tap room/i, "Bars & Nightlife"],
  [/salon|spa|barber|nail|beauty|hair|wax|lash|brow|skincare/i, "Beauty & Spa"],
  [/gallery/i, "Galleries"],
  [/museum|theat(re|er)|cinema|performing arts|cultural/i, "Culture"],
  [/gym|yoga|pilates|fitness|crossfit|cycling studio|barre/i, "Fitness"],
  [/restaurant|pizzeria|diner|grill|steakhouse|taqueria|sushi|ramen|noodle|bistro|eatery|food/i, "Restaurants"],
  [/store|shop|boutique|jewel|clothing|apparel|book|gift|florist|home goods|furniture|market/i, "Shops"],
  [/dentist|doctor|clinic|veterin|real estate|insurance|agency|attorney|lawyer|cleaner|repair/i, "Services"],
];

function mapCategory(categories: string[] | undefined): string {
  for (const cat of categories ?? []) {
    for (const [re, label] of CATEGORY_RULES) {
      if (re.test(cat)) return label;
    }
  }
  return "Local Business";
}

interface NetrowsPlace {
  name: string;
  feature_id?: string;
  place_id?: string;
  rating?: number | null;
  review_count?: number | null;
  categories?: string[];
  address?: string | null;
  website?: string | null;
  latitude?: number;
  longitude?: number;
  image?: string | null;
  phone?: string | null;
  open_state?: string | null;
  description?: string | null;
  price?: string | null;
}

interface NetrowsSearchResponse {
  query?: string;
  results?: NetrowsPlace[];
  total_results?: number;
  message?: string;
  code?: string;
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

async function fetchWithRetry(
  url: string,
  apiKey: string,
  maxAttempts = 4,
): Promise<NetrowsSearchResponse> {
  let lastErr = "";
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const text = await resp.text();
    let data: NetrowsSearchResponse;
    try {
      data = JSON.parse(text) as NetrowsSearchResponse;
    } catch {
      lastErr = `non-JSON ${resp.status}: ${text.slice(0, 200)}`;
      await sleep(1500 * attempt);
      continue;
    }
    if (resp.ok && Array.isArray(data.results)) return data;
    if (data.code === "SERVICE_UNAVAILABLE") {
      lastErr = data.message ?? "service unavailable";
      await sleep(2000 * attempt);
      continue;
    }
    throw new Error(
      `NETROWS ${resp.status} ${data.code ?? ""}: ${data.message ?? text.slice(0, 200)}`,
    );
  }
  throw new Error(`NETROWS unavailable after ${maxAttempts} attempts: ${lastErr}`);
}

/**
 * Text-search NETROWS Google Maps. Returns up to `maxResults` clean rows.
 * Throws if `NETROWS_API_KEY` is missing or the upstream fails after retries.
 */
export async function searchPlaces(
  query: string,
  maxResults = 20,
): Promise<PlaceResult[]> {
  const apiKey = process.env.NETROWS_API_KEY;
  if (!apiKey) throw new Error("NETROWS_API_KEY is not set");

  const url = `${NETROWS_SEARCH_URL}?query=${encodeURIComponent(query)}`;
  const data = await fetchWithRetry(url, apiKey);
  const places = (data.results ?? []).slice(0, maxResults);

  return places.map((p): PlaceResult => {
    const placeId =
      p.place_id || p.feature_id || `${p.name}-${p.latitude}-${p.longitude}`;
    return {
      placeId,
      name: p.name,
      category: mapCategory(p.categories),
      description: p.description ?? null,
      address: p.address ?? null,
      phone: p.phone ?? null,
      website: p.website ?? null,
      hours: p.open_state ?? null,
      imageUrl: p.image ?? null,
      rating: typeof p.rating === "number" ? p.rating : null,
      reviewCount: typeof p.review_count === "number" ? p.review_count : null,
      priceTier: p.price ?? null,
    };
  });
}
```

---

## 3. Photo URL gotcha — upgrade the CDN size

NETROWS returns Google CDN URLs ending in something like `=w400-h300-k-no`. That's a tiny thumbnail. You can rewrite the suffix to get a high-res version — but **only** for `googleusercontent.com` hosts, never blindly for any URL.

```ts
export function upgradeImageUrl(url: string | null): string | null {
  if (!url) return url;
  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    return url;
  }
  if (!/(^|\.)googleusercontent\.com$/.test(host)) return url;
  return url.replace(/=w\d+-h\d+(-[a-z-]+)?$/, "=w1600-h1200-k-no");
}
```

Apply it when serializing a business for the public API — not at write time — so you can change the size later without re-seeding.

### Frontend rule

When rendering a googleusercontent image in the browser, you **must** set `referrerPolicy="no-referrer"` or the CDN refuses the request:

```tsx
<img src={business.imageUrl} alt={business.name} referrerPolicy="no-referrer" />
```

Missing this is the #1 cause of "the API has photo URLs but they're all broken in the browser".

---

## 4. The seeder — `lib/seed.ts`

Runs once on server boot. Dedupes by Google Maps `place_id` so reruns extend the catalog instead of duplicating it.

```ts
// lib/seed.ts
import { searchPlaces } from "./places";
import { db } from "./db"; // your storage layer

export interface SeedResult {
  query: string;
  fetched: number;
  inserted: number;
  skipped: number;
  errors: string[];
}

async function doSeed(query: string): Promise<SeedResult> {
  const places = await searchPlaces(query, 20);
  const out: SeedResult = { query, fetched: places.length, inserted: 0, skipped: 0, errors: [] };

  for (const p of places) {
    try {
      // Dedupe key: store the mapping `seedByPlace:<placeId>` -> businessId.
      // If it exists, skip.
      const existing = await db.get(`seedByPlace:${p.placeId}`);
      if (existing) { out.skipped++; continue; }

      const biz = await db.insertBusiness({
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
      await db.set(`seedByPlace:${p.placeId}`, biz.id);
      out.inserted++;
    } catch (err) {
      out.errors.push(`${p.name}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  return out;
}

export async function runSeed(opts: { force?: boolean; query?: string } = {}): Promise<SeedResult> {
  const raw = opts.query ?? process.env.OTA_SEED_QUERY ?? "";
  // Multi-query: split on `,` `;` or `|` so one env var seeds across categories.
  const queries = raw.split(/\s*[,;|]\s*/).map(q => q.trim()).filter(Boolean);
  if (queries.length === 0)
    return { query: "", fetched: 0, inserted: 0, skipped: 0, errors: ["OTA_SEED_QUERY not set"] };
  if (!process.env.NETROWS_API_KEY)
    return { query: raw, fetched: 0, inserted: 0, skipped: 0, errors: ["NETROWS_API_KEY not set"] };

  const combined: SeedResult = { query: queries.join(" | "), fetched: 0, inserted: 0, skipped: 0, errors: [] };
  for (const q of queries) {
    try {
      const r = await doSeed(q);
      combined.fetched += r.fetched;
      combined.inserted += r.inserted;
      combined.skipped += r.skipped;
      combined.errors.push(...r.errors);
    } catch (err) {
      combined.errors.push(`[${q}] ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Only mark "done" if we actually inserted something, so a transient
  // upstream outage doesn't permanently block the boot-time seeder.
  if (!opts.force && combined.inserted > 0) {
    await db.set("seed:done", new Date().toISOString());
  }
  return combined;
}

export async function runSeedIfNeeded(): Promise<void> {
  if (await db.get("seed:done")) return;
  if (!process.env.OTA_SEED_QUERY || !process.env.NETROWS_API_KEY) return;
  await runSeed();
}
```

Call `runSeedIfNeeded()` from your server entrypoint after the DB is ready. Fire and forget — don't `await` it inline if you want fast boot:

```ts
// server.ts
app.listen(port, () => {
  void runSeedIfNeeded();
});
```

---

## 5. Configuration

Add a second secret/env var for the seed query:

| Name | Example | Notes |
| --- | --- | --- |
| `OTA_SEED_QUERY` | `restaurants Winter Park FL\|shops Park Avenue Winter Park\|cafes Winter Park FL\|salons Winter Park FL` | Pipe / semicolon / comma separated. Each segment is one NETROWS search (~20 results). |

Pick queries that match your product's geography + categories. NETROWS returns ~20 results per text search, so 5–8 queries gets you 100+ businesses with good category coverage and only modest API spend.

---

## 6. Optional: admin re-seed endpoint

Expose `runSeed({ force: true, query })` behind an admin-only route so you can refresh the catalog without redeploying:

```ts
app.post("/api/admin/seed", requireAdmin, async (req, res) => {
  const result = await runSeed({ force: true, query: req.body.query });
  res.json(result);
});
```

---

## 7. Data quality notes

- **`description`** is almost always `null`. NETROWS doesn't fabricate one. Either let owners fill it in via your own UI or generate one with an LLM at seed time.
- **`hours`** comes as a one-line string (`"Open ⋅ Closes 9 PM"`). If you need a real weekly schedule, NETROWS' "place details" endpoint returns structured hours — call it lazily per business when a user opens the detail page rather than during seed (cheaper).
- **`category`** depends entirely on your `CATEGORY_RULES`. Audit the seed output once and tune the regex list before going public — the default rules above cover a typical walkable retail/dining street.
- **`priceTier`** can be `null`, `"$"`, `"$$"`, `"$$$"`, `"$$$$"`, or a literal range like `"$10–20"`. Handle both.
- NETROWS returns up to ~20 results per query and may include businesses just outside your target area. Either filter by `address`/`latitude` after fetch, or write tighter queries with neighborhood + city + state.

---

## 8. Checklist for the agent

When wiring this into a new Repl:

1. Add `NETROWS_API_KEY` secret.
2. Add `OTA_SEED_QUERY` env var with 4–8 pipe-separated queries.
3. Drop `lib/places.ts` (adapter) and `lib/seed.ts` (seeder) into the server.
4. Add `upgradeImageUrl()` and call it when serializing businesses to the public API.
5. Call `runSeedIfNeeded()` from the server entrypoint.
6. On the frontend, render every business image with `referrerPolicy="no-referrer"`.
7. Surface `rating`, `reviewCount`, `priceTier`, `category`, and `imageUrl` on every business card — that's the data NETROWS gives you for free and what makes the directory feel real.
