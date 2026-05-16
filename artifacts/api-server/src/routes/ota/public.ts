import { Router, type IRouter } from "express";
import {
  OtaListBusinessesQueryParams,
  OtaGetBusinessParams,
  OtaGetCategoryParams,
} from "@workspace/api-zod";
import {
  listApproved,
  getBusinessBySlug,
  listCategoriesWithCounts,
  listByCategorySlug,
  listActiveOffers,
  toOfferDto,
  listUpcomingEvents,
  listBusinessesByStatus,
  toPublicBusiness,
} from "../../lib/ota/repo";

const router: IRouter = Router();

router.get("/home", async (_req, res) => {
  const [approved, categories, offers, events] = await Promise.all([
    listApproved(),
    listCategoriesWithCounts(),
    listActiveOffers(),
    listUpcomingEvents(),
  ]);
  const featured = approved.filter((b) => b.isFeatured || b.isFoundingSponsor).slice(0, 6);
  const spotlight = approved.find((b) => b.isFoundingSponsor) ?? null;
  const offerDtos = await Promise.all(offers.map(toOfferDto));
  res.json({
    featured: featured.map(toPublicBusiness),
    spotlight: spotlight ? toPublicBusiness(spotlight) : null,
    categories,
    offers: offerDtos,
    events: events.slice(0, 6),
  });
});

router.get("/businesses", async (req, res) => {
  const params = OtaListBusinessesQueryParams.parse(req.query);
  const list = await listApproved({ q: params.q, category: params.category });
  res.json(list.map(toPublicBusiness));
});

router.get("/businesses/:slug", async (req, res) => {
  const params = OtaGetBusinessParams.parse(req.params);
  const b = await getBusinessBySlug(params.slug);
  if (!b || b.status !== "approved") {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(toPublicBusiness(b));
});

router.get("/categories", async (_req, res) => {
  res.json(await listCategoriesWithCounts());
});

router.get("/categories/:slug", async (req, res) => {
  const params = OtaGetCategoryParams.parse(req.params);
  const { label, businesses } = await listByCategorySlug(params.slug);
  const intro = `Discover the best ${label.toLowerCase()} on the avenue — a curated guide to local businesses near Mint on the Avenue.`;
  res.json({ slug: params.slug, label, intro, businesses: businesses.map(toPublicBusiness) });
});

router.get("/offers", async (_req, res) => {
  const offers = await listActiveOffers();
  const dtos = await Promise.all(offers.map(toOfferDto));
  res.json(dtos);
});

router.get("/events", async (_req, res) => {
  res.json(await listUpcomingEvents());
});

// Keep TS happy about unused import in some builds
void listBusinessesByStatus;

export default router;
