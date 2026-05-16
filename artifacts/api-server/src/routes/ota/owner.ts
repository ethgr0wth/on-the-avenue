import { Router, type IRouter } from "express";
import {
  OtaOwnerSubmitBody,
  OtaOwnerRequestLinkBody,
  OtaOwnerVerifyBody,
  OtaOwnerUpdateListingParams,
  OtaOwnerUpdateListingBody,
} from "@workspace/api-zod";
import {
  createMagicToken,
  consumeMagicToken,
  createOwnerSession,
  readOwnerSession,
  destroyOwnerSession,
  requireOwner,
  setOwnerCookie,
  clearOwnerCookie,
  COOKIE_OWNER,
  type OwnerAuthedRequest,
} from "../../lib/ota/auth";
import { sendMagicLink } from "../../lib/ota/mailer";
import {
  createBusiness,
  listBusinessesByOwner,
  getBusiness,
  ownerUpdateBusiness,
} from "../../lib/ota/repo";

const router: IRouter = Router();

function baseUrl(req: { protocol: string; get: (h: string) => string | undefined }) {
  const envBase = process.env.OTA_PUBLIC_URL;
  if (envBase) return envBase.replace(/\/$/, "");
  const host = req.get("host") ?? "localhost";
  return `${req.protocol}://${host}`;
}

// Submit a new listing.
// Side effect: emails the owner a magic link to manage it.
router.post("/submit", async (req, res) => {
  const body = OtaOwnerSubmitBody.parse(req.body);
  const biz = await createBusiness({
    name: body.name,
    category: body.category,
    ownerEmail: body.ownerEmail,
    tagline: body.tagline,
    description: body.description,
    address: body.address,
    phone: body.phone,
    website: body.website,
    hours: body.hours,
    imageUrl: body.imageUrl,
    offer: body.offer,
  });
  const token = await createMagicToken(body.ownerEmail);
  await sendMagicLink({ to: body.ownerEmail, token, baseUrl: baseUrl(req) });
  res.status(201).json({
    ok: true,
    message: "Thanks! Your listing is pending review. We sent a magic link to your email so you can manage it.",
    listingId: biz.id,
  });
});

// Request a magic link for an existing email
router.post("/request-link", async (req, res) => {
  const body = OtaOwnerRequestLinkBody.parse(req.body);
  // Always 200 to prevent email enumeration
  const token = await createMagicToken(body.email);
  await sendMagicLink({ to: body.email, token, baseUrl: baseUrl(req) });
  res.json({ ok: true });
});

// Exchange magic token for session cookie
router.post("/verify", async (req, res) => {
  const body = OtaOwnerVerifyBody.parse(req.body);
  const email = await consumeMagicToken(body.token);
  if (!email) {
    res.status(401).json({ error: "Invalid or expired link" });
    return;
  }
  const session = await createOwnerSession(email);
  setOwnerCookie(res, session);
  const listings = await listBusinessesByOwner(email);
  res.json({ email, listings });
});

router.get("/me", async (req, res) => {
  const t = req.cookies?.[COOKIE_OWNER];
  const email = await readOwnerSession(t);
  if (!email) {
    res.status(401).json({ error: "Not signed in" });
    return;
  }
  const listings = await listBusinessesByOwner(email);
  res.json({ email, listings });
});

router.post("/logout", async (req, res) => {
  await destroyOwnerSession(req.cookies?.[COOKIE_OWNER]);
  clearOwnerCookie(res);
  res.json({ ok: true });
});

router.patch("/listings/:id", requireOwner, async (req, res) => {
  const params = OtaOwnerUpdateListingParams.parse(req.params);
  const body = OtaOwnerUpdateListingBody.parse(req.body);
  const biz = await getBusiness(params.id);
  if (!biz) {
    res.status(404).json({ error: "Listing not found" });
    return;
  }
  const ownerEmail = (req as OwnerAuthedRequest).ownerEmail;
  if ((biz.ownerEmail ?? "").toLowerCase() !== ownerEmail.toLowerCase()) {
    res.status(403).json({ error: "Not your listing" });
    return;
  }
  const result = await ownerUpdateBusiness(params.id, body);
  if (!result) {
    res.status(404).json({ error: "Listing not found" });
    return;
  }
  res.json({ listing: result.business, pendingMajor: result.pendingMajor });
});

export default router;
