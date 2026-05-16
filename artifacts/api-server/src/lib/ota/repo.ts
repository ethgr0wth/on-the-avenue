/**
 * OTA repository: business / offer / event CRUD against the storage layer.
 * Models are stored as Redis hashes; relationships as sets.
 */
import crypto from "node:crypto";
import { getStorage } from "./storage";
import { k } from "./keys";

export type ListingStatus = "pending" | "approved" | "rejected" | "unpublished";

export interface Business {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string | null;
  description: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  hours: string | null;
  imageUrl: string | null;
  offer: string | null;
  ownerEmail: string | null;
  isFeatured: boolean;
  isFoundingSponsor: boolean;
  status: ListingStatus;
  rejectionReason: string | null;
  pendingChanges: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Offer {
  id: string;
  businessId: string;
  title: string;
  description: string | null;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  eventDate: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
}

// ────────────────────────── Helpers ──────────────────────────

function nowIso() {
  return new Date().toISOString();
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "listing";
}

function nid() {
  return crypto.randomBytes(8).toString("base64url");
}

function serializeBusiness(b: Business): Record<string, string> {
  return {
    id: b.id,
    slug: b.slug,
    name: b.name,
    category: b.category,
    tagline: b.tagline ?? "",
    description: b.description ?? "",
    address: b.address ?? "",
    phone: b.phone ?? "",
    website: b.website ?? "",
    hours: b.hours ?? "",
    imageUrl: b.imageUrl ?? "",
    offer: b.offer ?? "",
    ownerEmail: b.ownerEmail ?? "",
    isFeatured: b.isFeatured ? "1" : "0",
    isFoundingSponsor: b.isFoundingSponsor ? "1" : "0",
    status: b.status,
    rejectionReason: b.rejectionReason ?? "",
    pendingChanges: b.pendingChanges ? JSON.stringify(b.pendingChanges) : "",
    createdAt: b.createdAt,
    updatedAt: b.updatedAt ?? "",
  };
}

function deserializeBusiness(h: Record<string, string>): Business | null {
  if (!h.id) return null;
  return {
    id: h.id,
    slug: h.slug,
    name: h.name,
    category: h.category,
    tagline: h.tagline || null,
    description: h.description || null,
    address: h.address || null,
    phone: h.phone || null,
    website: h.website || null,
    hours: h.hours || null,
    imageUrl: h.imageUrl || null,
    offer: h.offer || null,
    ownerEmail: h.ownerEmail || null,
    isFeatured: h.isFeatured === "1",
    isFoundingSponsor: h.isFoundingSponsor === "1",
    status: (h.status as ListingStatus) || "pending",
    rejectionReason: h.rejectionReason || null,
    pendingChanges: h.pendingChanges ? JSON.parse(h.pendingChanges) : null,
    createdAt: h.createdAt,
    updatedAt: h.updatedAt || null,
  };
}

function serializeOffer(o: Offer): Record<string, string> {
  return {
    id: o.id,
    businessId: o.businessId,
    title: o.title,
    description: o.description ?? "",
    expiresAt: o.expiresAt ?? "",
    isActive: o.isActive ? "1" : "0",
    createdAt: o.createdAt,
  };
}
function deserializeOffer(h: Record<string, string>): Offer | null {
  if (!h.id) return null;
  return {
    id: h.id,
    businessId: h.businessId,
    title: h.title,
    description: h.description || null,
    expiresAt: h.expiresAt || null,
    isActive: h.isActive === "1",
    createdAt: h.createdAt,
  };
}

function serializeEvent(e: Event): Record<string, string> {
  return {
    id: e.id,
    slug: e.slug,
    title: e.title,
    location: e.location ?? "",
    eventDate: e.eventDate,
    description: e.description ?? "",
    imageUrl: e.imageUrl ?? "",
    createdAt: e.createdAt,
  };
}
function deserializeEvent(h: Record<string, string>): Event | null {
  if (!h.id) return null;
  return {
    id: h.id,
    slug: h.slug,
    title: h.title,
    location: h.location || null,
    eventDate: h.eventDate,
    description: h.description || null,
    imageUrl: h.imageUrl || null,
    createdAt: h.createdAt,
  };
}

// ────────────────────────── Slug allocation ──────────────────────────

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  const s = getStorage();
  let candidate = base;
  let n = 2;
  while (true) {
    const existing = await s.get(k.bySlug(candidate));
    if (!existing || existing === ignoreId) return candidate;
    candidate = `${base}-${n++}`;
    if (n > 200) return `${base}-${nid()}`;
  }
}

// ────────────────────────── Business CRUD ──────────────────────────

export async function createBusiness(input: {
  name: string;
  category: string;
  ownerEmail: string;
  tagline?: string;
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  hours?: string;
  imageUrl?: string;
  offer?: string;
}): Promise<Business> {
  const s = getStorage();
  const id = nid();
  const slug = await uniqueSlug(slugify(input.name));
  const biz: Business = {
    id,
    slug,
    name: input.name.trim(),
    category: input.category.trim(),
    tagline: input.tagline?.trim() || null,
    description: input.description?.trim() || null,
    address: input.address?.trim() || null,
    phone: input.phone?.trim() || null,
    website: input.website?.trim() || null,
    hours: input.hours?.trim() || null,
    imageUrl: input.imageUrl?.trim() || null,
    offer: input.offer?.trim() || null,
    ownerEmail: input.ownerEmail.toLowerCase().trim(),
    isFeatured: false,
    isFoundingSponsor: false,
    status: "pending",
    rejectionReason: null,
    pendingChanges: null,
    createdAt: nowIso(),
    updatedAt: null,
  };
  await s.hset(k.business(id), serializeBusiness(biz));
  await s.set(k.bySlug(slug), id);
  await s.sadd(k.byEmail(biz.ownerEmail!), id);
  await s.sadd(k.byStatus("pending"), id);
  await s.sadd(k.byCategory(biz.category), id);
  return biz;
}

/**
 * Insert an already-approved business (e.g. seeded from Google Places).
 * No owner email, no pending state — goes live immediately.
 * Caller is responsible for dedup (placeId mapping in storage).
 */
export async function seedBusiness(input: {
  name: string;
  category: string;
  tagline?: string | null;
  description?: string | null;
  address?: string | null;
  phone?: string | null;
  website?: string | null;
  hours?: string | null;
  imageUrl?: string | null;
}): Promise<Business> {
  const s = getStorage();
  const id = nid();
  const slug = await uniqueSlug(slugify(input.name));
  const biz: Business = {
    id,
    slug,
    name: input.name.trim(),
    category: input.category.trim(),
    tagline: input.tagline?.trim() || null,
    description: input.description?.trim() || null,
    address: input.address?.trim() || null,
    phone: input.phone?.trim() || null,
    website: input.website?.trim() || null,
    hours: input.hours?.trim() || null,
    imageUrl: input.imageUrl?.trim() || null,
    offer: null,
    ownerEmail: null,
    isFeatured: false,
    isFoundingSponsor: false,
    status: "approved",
    rejectionReason: null,
    pendingChanges: null,
    createdAt: nowIso(),
    updatedAt: null,
  };
  await s.hset(k.business(id), serializeBusiness(biz));
  await s.set(k.bySlug(slug), id);
  await s.sadd(k.byStatus("approved"), id);
  await s.sadd(k.byCategory(biz.category), id);
  return biz;
}

export async function getBusiness(id: string): Promise<Business | null> {
  const h = await getStorage().hgetall(k.business(id));
  if (!h || !h.id) return null;
  return deserializeBusiness(h);
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  const id = await getStorage().get(k.bySlug(slug));
  if (!id) return null;
  return getBusiness(id);
}

async function getBusinessesByIds(ids: string[]): Promise<Business[]> {
  const out: Business[] = [];
  for (const id of ids) {
    const b = await getBusiness(id);
    if (b) out.push(b);
  }
  return out;
}

export async function listBusinessesByStatus(status: ListingStatus): Promise<Business[]> {
  const ids = await getStorage().smembers(k.byStatus(status));
  return getBusinessesByIds(ids);
}

export async function listAllBusinesses(): Promise<Business[]> {
  const statuses: ListingStatus[] = ["approved", "pending", "rejected", "unpublished"];
  const out: Business[] = [];
  for (const st of statuses) out.push(...(await listBusinessesByStatus(st)));
  return out;
}

export async function listApproved(opts?: { q?: string; category?: string }): Promise<Business[]> {
  let list = await listBusinessesByStatus("approved");
  if (opts?.category) {
    const cat = opts.category.toLowerCase();
    list = list.filter((b) => b.category.toLowerCase() === cat);
  }
  if (opts?.q) {
    const q = opts.q.toLowerCase();
    list = list.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        (b.description ?? "").toLowerCase().includes(q) ||
        (b.tagline ?? "").toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q),
    );
  }
  // Featured / founding-sponsor first, then alpha
  return list.sort((a, b) => {
    if (a.isFoundingSponsor !== b.isFoundingSponsor) return a.isFoundingSponsor ? -1 : 1;
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export async function listBusinessesByOwner(email: string): Promise<Business[]> {
  const ids = await getStorage().smembers(k.byEmail(email.toLowerCase()));
  return getBusinessesByIds(ids);
}

const MAJOR_FIELDS = new Set(["name", "category"]);

export interface UpdateOutcome {
  business: Business;
  pendingMajor: boolean;
}

/**
 * Owner-side update with tiered re-approval:
 *  - Changes to MAJOR_FIELDS on an already-approved listing → stashed in pendingChanges,
 *    listing added to pendingEdits queue, listing stays live as-is.
 *  - All other fields → applied immediately.
 *  - For pending/rejected listings, all fields apply directly (still needs approval).
 */
export async function ownerUpdateBusiness(
  id: string,
  patch: Partial<Pick<Business,
    "name" | "category" | "tagline" | "description" | "address" |
    "phone" | "website" | "hours" | "imageUrl" | "offer">>,
): Promise<UpdateOutcome | null> {
  const s = getStorage();
  const current = await getBusiness(id);
  if (!current) return null;

  const isApproved = current.status === "approved";
  const minor: Partial<Business> = {};
  const major: Record<string, unknown> = {};

  for (const [key, val] of Object.entries(patch)) {
    if (val === undefined) continue;
    if (isApproved && MAJOR_FIELDS.has(key)) {
      major[key] = val;
    } else {
      (minor as Record<string, unknown>)[key] = val;
    }
  }

  // Apply minor changes
  if ("category" in minor && typeof minor.category === "string" && minor.category !== current.category) {
    await s.srem(k.byCategory(current.category), id);
    await s.sadd(k.byCategory(minor.category), id);
  }
  if ("name" in minor && typeof minor.name === "string" && minor.name !== current.name) {
    // re-slug
    const newSlug = await uniqueSlug(slugify(minor.name), id);
    if (newSlug !== current.slug) {
      await s.del(k.bySlug(current.slug));
      await s.set(k.bySlug(newSlug), id);
      (minor as Business).slug = newSlug;
    }
  }

  const merged: Business = {
    ...current,
    ...minor,
    pendingChanges:
      Object.keys(major).length > 0
        ? { ...(current.pendingChanges ?? {}), ...major }
        : current.pendingChanges,
    updatedAt: nowIso(),
  };

  await s.hset(k.business(id), serializeBusiness(merged));

  const pendingMajor = Object.keys(major).length > 0;
  if (pendingMajor) {
    await s.sadd(k.pendingEdits(), id);
  }

  return { business: merged, pendingMajor };
}

export async function adminUpdateBusiness(
  id: string,
  patch: Partial<Business>,
): Promise<Business | null> {
  const s = getStorage();
  const current = await getBusiness(id);
  if (!current) return null;

  // status transitions
  if (patch.status && patch.status !== current.status) {
    await s.srem(k.byStatus(current.status), id);
    await s.sadd(k.byStatus(patch.status), id);
  }
  // category change
  if (patch.category && patch.category !== current.category) {
    await s.srem(k.byCategory(current.category), id);
    await s.sadd(k.byCategory(patch.category), id);
  }
  // name change → re-slug
  let newSlug = current.slug;
  if (patch.name && patch.name !== current.name) {
    newSlug = await uniqueSlug(slugify(patch.name), id);
    if (newSlug !== current.slug) {
      await s.del(k.bySlug(current.slug));
      await s.set(k.bySlug(newSlug), id);
    }
  }
  // featured set
  if (typeof patch.isFeatured === "boolean") {
    if (patch.isFeatured) await s.sadd(k.featured(), id);
    else await s.srem(k.featured(), id);
  }

  const merged: Business = {
    ...current,
    ...patch,
    slug: newSlug,
    updatedAt: nowIso(),
  };
  await s.hset(k.business(id), serializeBusiness(merged));
  return merged;
}

export async function approveBusiness(id: string): Promise<Business | null> {
  const s = getStorage();
  const current = await getBusiness(id);
  if (!current) return null;
  // If there are pending major changes, fold them in
  const pending = current.pendingChanges ?? {};
  const merged: Business = {
    ...current,
    ...(pending as Partial<Business>),
    status: "approved",
    rejectionReason: null,
    pendingChanges: null,
  };
  // Update indexes for any folded-in major fields
  if (typeof pending.category === "string" && pending.category !== current.category) {
    await s.srem(k.byCategory(current.category), id);
    await s.sadd(k.byCategory(pending.category), id);
  }
  if (typeof pending.name === "string" && pending.name !== current.name) {
    const newSlug = await uniqueSlug(slugify(pending.name), id);
    if (newSlug !== current.slug) {
      await s.del(k.bySlug(current.slug));
      await s.set(k.bySlug(newSlug), id);
      merged.slug = newSlug;
    }
  }
  await s.srem(k.byStatus(current.status), id);
  await s.sadd(k.byStatus("approved"), id);
  await s.srem(k.pendingEdits(), id);
  merged.updatedAt = nowIso();
  await s.hset(k.business(id), serializeBusiness(merged));
  return merged;
}

/**
 * Public-safe DTO: strips owner email and internal moderation fields.
 * Use for all unauthenticated/public responses.
 */
export type PublicBusiness = Omit<
  Business,
  "ownerEmail" | "pendingChanges" | "rejectionReason"
>;
export function toPublicBusiness(b: Business): PublicBusiness {
  const { ownerEmail: _o, pendingChanges: _p, rejectionReason: _r, ...rest } = b;
  void _o; void _p; void _r;
  return rest;
}

/**
 * Reject a *pending edit* on an already-approved listing:
 * discard the pendingChanges payload but keep the live listing approved.
 * Use this instead of rejectBusiness() when moderating an edit.
 */
export async function rejectPendingEdit(id: string, reason: string): Promise<Business | null> {
  const s = getStorage();
  const current = await getBusiness(id);
  if (!current) return null;
  await s.srem(k.pendingEdits(), id);
  const merged: Business = {
    ...current,
    pendingChanges: null,
    // Surface the reason on the listing so the owner sees why the edit was declined,
    // without changing live status.
    rejectionReason: reason,
    updatedAt: nowIso(),
  };
  await s.hset(k.business(id), serializeBusiness(merged));
  return merged;
}

export async function rejectBusiness(id: string, reason: string): Promise<Business | null> {
  const s = getStorage();
  const current = await getBusiness(id);
  if (!current) return null;
  await s.srem(k.byStatus(current.status), id);
  await s.sadd(k.byStatus("rejected"), id);
  await s.srem(k.pendingEdits(), id);
  const merged: Business = {
    ...current,
    status: "rejected",
    rejectionReason: reason,
    pendingChanges: null,
    updatedAt: nowIso(),
  };
  await s.hset(k.business(id), serializeBusiness(merged));
  return merged;
}

export async function deleteBusiness(id: string): Promise<boolean> {
  const s = getStorage();
  const current = await getBusiness(id);
  if (!current) return false;
  await s.srem(k.byStatus(current.status), id);
  await s.srem(k.byCategory(current.category), id);
  await s.srem(k.featured(), id);
  await s.srem(k.pendingEdits(), id);
  if (current.ownerEmail) await s.srem(k.byEmail(current.ownerEmail), id);
  await s.del(k.bySlug(current.slug));
  await s.del(k.business(id));
  // Delete this business's offers
  const offerIds = await s.smembers(k.offerByBusiness(id));
  for (const oid of offerIds) {
    await s.srem(k.offerActive(), oid);
    await s.del(k.offer(oid));
  }
  await s.del(k.offerByBusiness(id));
  return true;
}

export async function listPendingEdits(): Promise<Business[]> {
  const ids = await getStorage().smembers(k.pendingEdits());
  return getBusinessesByIds(ids);
}

// ────────────────────────── Offers ──────────────────────────

export async function createOffer(input: {
  businessId: string;
  title: string;
  description?: string;
  expiresAt?: string;
}): Promise<Offer | null> {
  const s = getStorage();
  const biz = await getBusiness(input.businessId);
  if (!biz) return null;
  const id = nid();
  const o: Offer = {
    id,
    businessId: input.businessId,
    title: input.title.trim(),
    description: input.description?.trim() || null,
    expiresAt: input.expiresAt || null,
    isActive: true,
    createdAt: nowIso(),
  };
  await s.hset(k.offer(id), serializeOffer(o));
  await s.sadd(k.offerActive(), id);
  await s.sadd(k.offerByBusiness(input.businessId), id);
  return o;
}

export async function listActiveOffers(): Promise<Offer[]> {
  const s = getStorage();
  const ids = await s.smembers(k.offerActive());
  const out: Offer[] = [];
  for (const id of ids) {
    const h = await s.hgetall(k.offer(id));
    const o = deserializeOffer(h);
    if (!o) continue;
    if (o.expiresAt && new Date(o.expiresAt) < new Date()) {
      // expired — flip inactive
      await s.srem(k.offerActive(), id);
      o.isActive = false;
      await s.hset(k.offer(id), serializeOffer(o));
      continue;
    }
    out.push(o);
  }
  return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function deleteOffer(id: string): Promise<boolean> {
  const s = getStorage();
  const h = await s.hgetall(k.offer(id));
  const o = deserializeOffer(h);
  if (!o) return false;
  await s.srem(k.offerActive(), id);
  await s.srem(k.offerByBusiness(o.businessId), id);
  await s.del(k.offer(id));
  return true;
}

// ────────────────────────── Events ──────────────────────────

export async function createEvent(input: {
  title: string;
  eventDate: string;
  location?: string;
  description?: string;
  imageUrl?: string;
}): Promise<Event> {
  const s = getStorage();
  const id = nid();
  const baseSlug = slugify(input.title);
  let slug = baseSlug;
  let n = 2;
  while (await s.get(k.eventBySlug(slug))) {
    slug = `${baseSlug}-${n++}`;
    if (n > 100) { slug = `${baseSlug}-${nid()}`; break; }
  }
  const e: Event = {
    id,
    slug,
    title: input.title.trim(),
    location: input.location?.trim() || null,
    eventDate: input.eventDate,
    description: input.description?.trim() || null,
    imageUrl: input.imageUrl?.trim() || null,
    createdAt: nowIso(),
  };
  await s.hset(k.event(id), serializeEvent(e));
  await s.set(k.eventBySlug(slug), id);
  await s.zadd(k.eventUpcoming(), new Date(input.eventDate).getTime(), id);
  return e;
}

export async function listUpcomingEvents(): Promise<Event[]> {
  const s = getStorage();
  // Pull everything; filter expired client-side so we can also clean them up
  const ids = await s.zrange(k.eventUpcoming(), 0, -1);
  const out: Event[] = [];
  const cutoff = Date.now() - 1000 * 60 * 60 * 6; // keep 6h after start
  for (const id of ids) {
    const h = await s.hgetall(k.event(id));
    const e = deserializeEvent(h);
    if (!e) continue;
    if (new Date(e.eventDate).getTime() < cutoff) {
      await s.zrem(k.eventUpcoming(), id);
      continue;
    }
    out.push(e);
  }
  return out;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const s = getStorage();
  const h = await s.hgetall(k.event(id));
  const e = deserializeEvent(h);
  if (!e) return false;
  await s.zrem(k.eventUpcoming(), id);
  await s.del(k.eventBySlug(e.slug));
  await s.del(k.event(id));
  return true;
}

// ────────────────────────── DTOs ──────────────────────────

export interface OfferDto extends Offer {
  businessName: string | null;
  businessSlug: string | null;
}

export async function toOfferDto(o: Offer): Promise<OfferDto> {
  const b = await getBusiness(o.businessId);
  return {
    ...o,
    businessName: b?.name ?? null,
    businessSlug: b?.slug ?? null,
  };
}

// ────────────────────────── Category helpers ──────────────────────────

export interface CategoryEntry {
  slug: string;
  label: string;
  count: number;
}

export async function listCategoriesWithCounts(): Promise<CategoryEntry[]> {
  const approved = await listBusinessesByStatus("approved");
  const counts = new Map<string, { label: string; count: number }>();
  for (const b of approved) {
    const key = slugify(b.category);
    const entry = counts.get(key);
    if (entry) entry.count++;
    else counts.set(key, { label: b.category, count: 1 });
  }
  return Array.from(counts.entries())
    .map(([slug, v]) => ({ slug, label: v.label, count: v.count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export async function listByCategorySlug(slug: string): Promise<{ label: string; businesses: Business[] }> {
  const all = await listBusinessesByStatus("approved");
  const matches = all.filter((b) => slugify(b.category) === slug);
  const label = matches[0]?.category ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { label, businesses: matches };
}
