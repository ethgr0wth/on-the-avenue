/**
 * NETROWS Google Maps adapter.
 * NETROWS wraps Google Maps + Yelp + ~55 other sources behind one bearer-token API.
 * We only need text search → CDN photo URL + ratings/reviews/price for the Yelp aesthetic.
 */
import { logger } from "../logger";

const NETROWS_SEARCH_URL = "https://api.netrows.com/v1/google-maps/search";

export interface PlaceResult {
  placeId: string;
  name: string;
  category: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  hours: string | null;
  imageUrl: string | null;
  rating: number | null;
  reviewCount: number | null;
  priceTier: string | null;
}

/**
 * NETROWS returns human-readable Google Maps category strings like
 * "Pizza restaurant", "Beauty salon", "Hair salon". Map them to our
 * coarse OTA categories by substring match — first hit wins.
 */
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

/**
 * NETROWS occasionally returns `SERVICE_UNAVAILABLE` when its upstream is rate-limited.
 * Retry a few times with backoff before giving up.
 */
async function fetchWithRetry(url: string, apiKey: string, maxAttempts = 4): Promise<NetrowsSearchResponse> {
  let lastErr = "";
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const resp = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const text = await resp.text();
    let data: NetrowsSearchResponse;
    try {
      data = JSON.parse(text) as NetrowsSearchResponse;
    } catch {
      lastErr = `non-JSON ${resp.status}: ${text.slice(0, 200)}`;
      logger.warn({ attempt, status: resp.status }, "netrows: non-JSON response");
      await sleep(1500 * attempt);
      continue;
    }
    if (resp.ok && Array.isArray(data.results)) return data;
    if (data.code === "SERVICE_UNAVAILABLE") {
      lastErr = data.message ?? "service unavailable";
      logger.warn({ attempt, code: data.code }, "netrows: service unavailable, retrying");
      await sleep(2000 * attempt);
      continue;
    }
    throw new Error(`NETROWS ${resp.status} ${data.code ?? ""}: ${data.message ?? text.slice(0, 200)}`);
  }
  throw new Error(`NETROWS unavailable after ${maxAttempts} attempts: ${lastErr}`);
}

/**
 * Text-search the NETROWS Google Maps endpoint.
 * Returns up to `maxResults` results with CDN photo URLs ready to use.
 */
export async function searchPlaces(query: string, maxResults = 20): Promise<PlaceResult[]> {
  const apiKey = process.env.NETROWS_API_KEY;
  if (!apiKey) throw new Error("NETROWS_API_KEY is not set");

  const url = `${NETROWS_SEARCH_URL}?query=${encodeURIComponent(query)}`;
  const data = await fetchWithRetry(url, apiKey);
  const places = (data.results ?? []).slice(0, maxResults);

  return places.map((p): PlaceResult => {
    const placeId = p.place_id || p.feature_id || `${p.name}-${p.latitude}-${p.longitude}`;
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
