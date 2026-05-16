import { Router, type IRouter } from "express";
import crypto from "node:crypto";
import {
  OtaAdminLoginBody,
  OtaAdminListAllListingsQueryParams,
  OtaAdminApproveListingParams,
  OtaAdminRejectListingParams,
  OtaAdminRejectListingBody,
  OtaAdminUpdateListingParams,
  OtaAdminUpdateListingBody,
  OtaAdminDeleteListingParams,
  OtaAdminCreateOfferBody,
  OtaAdminDeleteOfferParams,
  OtaAdminCreateEventBody,
  OtaAdminDeleteEventParams,
} from "@workspace/api-zod";
import {
  createAdminSession,
  destroyAdminSession,
  readAdminSession,
  requireAdmin,
  setAdminCookie,
  clearAdminCookie,
  COOKIE_ADMIN,
} from "../../lib/ota/auth";
import {
  listBusinessesByStatus,
  listPendingEdits,
  listAllBusinesses,
  approveBusiness,
  rejectBusiness,
  rejectPendingEdit,
  getBusiness,
  adminUpdateBusiness,
  deleteBusiness,
  createOffer,
  listActiveOffers,
  toOfferDto,
  deleteOffer,
  createEvent,
  listUpcomingEvents,
  deleteEvent,
  type ListingStatus,
} from "../../lib/ota/repo";
import { runSeed } from "../../lib/ota/seed";

const router: IRouter = Router();

function timingSafeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

router.post("/login", async (req, res) => {
  const body = OtaAdminLoginBody.parse(req.body);
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    res.status(500).json({ error: "Admin password not configured" });
    return;
  }
  if (!timingSafeEqual(body.password, expected)) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  const t = await createAdminSession();
  setAdminCookie(res, t);
  res.json({ ok: true });
});

router.post("/logout", async (req, res) => {
  await destroyAdminSession(req.cookies?.[COOKIE_ADMIN]);
  clearAdminCookie(res);
  res.json({ ok: true });
});

router.get("/me", async (req, res) => {
  const ok = await readAdminSession(req.cookies?.[COOKIE_ADMIN]);
  if (!ok) {
    res.status(401).json({ error: "Not signed in" });
    return;
  }
  res.json({ authenticated: true });
});

router.use(requireAdmin);

// Admin-triggered re-seed from Google Places. Not in OpenAPI — call via curl/Postman.
// POST /api/ota/admin/seed   body: { query?: string, force?: boolean }
router.post("/seed", async (req, res) => {
  const query = typeof req.body?.query === "string" ? req.body.query : undefined;
  const force = req.body?.force === true;
  const result = await runSeed({ query, force });
  res.json(result);
});

router.get("/queue", async (_req, res) => {
  const [pendingSubmissions, pendingEdits] = await Promise.all([
    listBusinessesByStatus("pending"),
    listPendingEdits(),
  ]);
  res.json({ pendingSubmissions, pendingEdits });
});

router.get("/listings", async (req, res) => {
  const { status } = OtaAdminListAllListingsQueryParams.parse(req.query);
  if (!status || status === "all") {
    res.json(await listAllBusinesses());
    return;
  }
  res.json(await listBusinessesByStatus(status as ListingStatus));
});

router.post("/listings/:id/approve", async (req, res) => {
  const { id } = OtaAdminApproveListingParams.parse(req.params);
  const b = await approveBusiness(id);
  if (!b) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(b);
});

router.post("/listings/:id/reject", async (req, res) => {
  const { id } = OtaAdminRejectListingParams.parse(req.params);
  const { reason } = OtaAdminRejectListingBody.parse(req.body);
  // Distinguish rejecting a brand-new submission (sets status=rejected)
  // from rejecting a pending edit on an already-approved listing
  // (discards pendingChanges but keeps the listing live).
  const current = await getBusiness(id);
  if (!current) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  const isEditOnApproved =
    current.status === "approved" &&
    current.pendingChanges != null &&
    Object.keys(current.pendingChanges).length > 0;
  const b = isEditOnApproved
    ? await rejectPendingEdit(id, reason)
    : await rejectBusiness(id, reason);
  if (!b) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(b);
});

router.patch("/listings/:id", async (req, res) => {
  const { id } = OtaAdminUpdateListingParams.parse(req.params);
  const patch = OtaAdminUpdateListingBody.parse(req.body);
  const b = await adminUpdateBusiness(id, patch);
  if (!b) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(b);
});

router.delete("/listings/:id", async (req, res) => {
  const { id } = OtaAdminDeleteListingParams.parse(req.params);
  const ok = await deleteBusiness(id);
  res.json({ ok });
});

router.get("/offers", async (_req, res) => {
  const offers = await listActiveOffers();
  const dtos = await Promise.all(offers.map(toOfferDto));
  res.json(dtos);
});

router.post("/offers", async (req, res) => {
  const body = OtaAdminCreateOfferBody.parse(req.body);
  const o = await createOffer({
    businessId: body.businessId,
    title: body.title,
    description: body.description,
    expiresAt: body.expiresAt,
  });
  if (!o) {
    res.status(400).json({ error: "Business not found" });
    return;
  }
  const dto = await toOfferDto(o);
  res.status(201).json(dto);
});

router.delete("/offers/:id", async (req, res) => {
  const { id } = OtaAdminDeleteOfferParams.parse(req.params);
  const ok = await deleteOffer(id);
  res.json({ ok });
});

router.get("/events", async (_req, res) => {
  res.json(await listUpcomingEvents());
});

router.post("/events", async (req, res) => {
  const body = OtaAdminCreateEventBody.parse(req.body);
  const e = await createEvent({
    title: body.title,
    eventDate: body.eventDate,
    location: body.location,
    description: body.description,
    imageUrl: body.imageUrl,
  });
  res.status(201).json(e);
});

router.delete("/events/:id", async (req, res) => {
  const { id } = OtaAdminDeleteEventParams.parse(req.params);
  const ok = await deleteEvent(id);
  res.json({ ok });
});

export default router;
