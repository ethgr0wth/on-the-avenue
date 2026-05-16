import { logger } from "../logger";

const TEXT_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";

export interface PlaceResult {
  placeId: string;
  name: string;
  category: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  hours: string | null;
  imageUrl: string | null;
  rating: number | null;
}

const TYPE_TO_CATEGORY: Record<string, string> = {
  restaurant: "Restaurants",
  meal_takeaway: "Restaurants",
  meal_delivery: "Restaurants",
  cafe: "Cafés",
  coffee_shop: "Cafés",
  bakery: "Bakeries",
  ice_cream_shop: "Bakeries",
  bar: "Bars & Nightlife",
  night_club: "Bars & Nightlife",
  pub: "Bars & Nightlife",
  wine_bar: "Bars & Nightlife",
  beauty_salon: "Beauty & Spa",
  hair_care: "Beauty & Spa",
  hair_salon: "Beauty & Spa",
  spa: "Beauty & Spa",
  nail_salon: "Beauty & Spa",
  barber_shop: "Beauty & Spa",
  clothing_store: "Shops",
  jewelry_store: "Shops",
  book_store: "Shops",
  gift_shop: "Shops",
  shoe_store: "Shops",
  furniture_store: "Shops",
  home_goods_store: "Shops",
  store: "Shops",
  art_gallery: "Galleries",
  museum: "Culture",
  performing_arts_theater: "Culture",
  gym: "Fitness",
  yoga_studio: "Fitness",
  fitness_center: "Fitness",
  florist: "Shops",
  pet_store: "Shops",
  veterinary_care: "Services",
  dentist: "Services",
  real_estate_agency: "Services",
};

function mapCategory(primary: string | undefined, types: string[] | undefined): string {
  if (primary && TYPE_TO_CATEGORY[primary]) return TYPE_TO_CATEGORY[primary];
  for (const t of types ?? []) {
    if (TYPE_TO_CATEGORY[t]) return TYPE_TO_CATEGORY[t];
  }
  return "Local Business";
}

interface GPlace {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  primaryType?: string;
  types?: string[];
  photos?: { name: string }[];
  rating?: number;
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  businessStatus?: string;
}

/**
 * Resolve a Google photo reference to a stable CDN URL.
 * Using skipHttpRedirect=true returns JSON with a googleusercontent.com URL
 * so we never have to expose the API key in client-facing image tags.
 */
async function resolvePhoto(photoName: string, apiKey: string): Promise<string | null> {
  try {
    const url =
      `https://places.googleapis.com/v1/${photoName}/media` +
      `?maxWidthPx=1200&maxHeightPx=800&skipHttpRedirect=true&key=${encodeURIComponent(apiKey)}`;
    const resp = await fetch(url);
    if (!resp.ok) return null;
    const data = (await resp.json()) as { photoUri?: string };
    return data.photoUri ?? null;
  } catch (err) {
    logger.warn({ err }, "places: photo resolve failed");
    return null;
  }
}

/**
 * Text-search Places API (New). Returns up to `maxResults` results,
 * with photos pre-resolved to CDN URLs.
 */
export async function searchPlaces(query: string, maxResults = 20): Promise<PlaceResult[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_PLACES_API_KEY is not set");

  const fieldMask = [
    "places.id",
    "places.displayName",
    "places.formattedAddress",
    "places.nationalPhoneNumber",
    "places.websiteUri",
    "places.primaryType",
    "places.types",
    "places.photos",
    "places.rating",
    "places.businessStatus",
    "places.regularOpeningHours.weekdayDescriptions",
  ].join(",");

  const resp = await fetch(TEXT_SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": fieldMask,
    },
    body: JSON.stringify({ textQuery: query, pageSize: Math.min(maxResults, 20) }),
  });

  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`Places API ${resp.status}: ${body.slice(0, 400)}`);
  }

  const data = (await resp.json()) as { places?: GPlace[] };
  const places = (data.places ?? []).filter(
    (p) => p.businessStatus !== "CLOSED_PERMANENTLY",
  );

  const results: PlaceResult[] = [];
  for (const p of places) {
    const photoName = p.photos?.[0]?.name;
    const imageUrl = photoName ? await resolvePhoto(photoName, apiKey) : null;
    results.push({
      placeId: p.id,
      name: p.displayName?.text ?? "Unnamed",
      category: mapCategory(p.primaryType, p.types),
      address: p.formattedAddress ?? null,
      phone: p.nationalPhoneNumber ?? null,
      website: p.websiteUri ?? null,
      hours: p.regularOpeningHours?.weekdayDescriptions?.join("\n") ?? null,
      imageUrl,
      rating: typeof p.rating === "number" ? p.rating : null,
    });
  }
  return results;
}
