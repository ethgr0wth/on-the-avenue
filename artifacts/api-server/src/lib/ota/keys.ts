/** Namespaced key helpers for OTA. */
export const NS = "ota";

export const k = {
  // Business primary record (hash)
  business: (id: string) => `${NS}:business:${id}`,
  // Slug -> id lookup
  bySlug: (slug: string) => `${NS}:business:slug:${slug}`,
  // Owner email -> set of business ids
  byEmail: (email: string) => `${NS}:business:email:${email.toLowerCase()}`,
  // Status set
  byStatus: (status: string) => `${NS}:business:status:${status}`,
  // Category set
  byCategory: (cat: string) => `${NS}:business:category:${cat.toLowerCase()}`,
  // Featured set
  featured: () => `${NS}:business:featured`,
  // Has-pending-edit set
  pendingEdits: () => `${NS}:business:pending-edits`,
  // Counter for ids (used as fallback / display)
  businessSeq: () => `${NS}:seq:business`,

  // Offers
  offer: (id: string) => `${NS}:offer:${id}`,
  offerActive: () => `${NS}:offer:active`,
  offerByBusiness: (bid: string) => `${NS}:offer:business:${bid}`,
  offerSeq: () => `${NS}:seq:offer`,

  // Events
  event: (id: string) => `${NS}:event:${id}`,
  eventUpcoming: () => `${NS}:event:upcoming`,
  eventSeq: () => `${NS}:seq:event`,
  eventBySlug: (slug: string) => `${NS}:event:slug:${slug}`,

  // Magic-link tokens (single-use)
  magic: (token: string) => `${NS}:magic:${token}`,
  // Owner sessions
  ownerSession: (token: string) => `${NS}:session:owner:${token}`,
  // Admin sessions
  adminSession: (token: string) => `${NS}:session:admin:${token}`,
};
