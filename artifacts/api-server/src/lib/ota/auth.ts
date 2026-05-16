import crypto from "node:crypto";
import type { Request, Response, NextFunction } from "express";
import { getStorage } from "./storage";
import { k } from "./keys";

const MAGIC_TTL_SECONDS = 15 * 60; // 15 minutes
const OWNER_SESSION_TTL = 60 * 60 * 24 * 30; // 30 days
const ADMIN_SESSION_TTL = 60 * 60 * 24 * 7; // 7 days

export const COOKIE_OWNER = "ota_owner";
export const COOKIE_ADMIN = "ota_admin";

function token(bytes = 24) {
  return crypto.randomBytes(bytes).toString("base64url");
}

// ────────────────────────── Magic link ──────────────────────────

export async function createMagicToken(email: string): Promise<string> {
  const t = token();
  await getStorage().set(k.magic(t), email.toLowerCase(), MAGIC_TTL_SECONDS);
  return t;
}

export async function consumeMagicToken(t: string): Promise<string | null> {
  // Atomic get-and-delete enforces true single-use under concurrency.
  return getStorage().getdel(k.magic(t));
}

// ────────────────────────── Owner session ──────────────────────────

export async function createOwnerSession(email: string): Promise<string> {
  const t = token();
  await getStorage().set(k.ownerSession(t), email.toLowerCase(), OWNER_SESSION_TTL);
  return t;
}

export async function readOwnerSession(t: string | undefined): Promise<string | null> {
  if (!t) return null;
  return getStorage().get(k.ownerSession(t));
}

export async function destroyOwnerSession(t: string | undefined) {
  if (!t) return;
  await getStorage().del(k.ownerSession(t));
}

// ────────────────────────── Admin session ──────────────────────────

export async function createAdminSession(): Promise<string> {
  const t = token();
  await getStorage().set(k.adminSession(t), "1", ADMIN_SESSION_TTL);
  return t;
}

export async function readAdminSession(t: string | undefined): Promise<boolean> {
  if (!t) return false;
  const v = await getStorage().get(k.adminSession(t));
  return v === "1";
}

export async function destroyAdminSession(t: string | undefined) {
  if (!t) return;
  await getStorage().del(k.adminSession(t));
}

// ────────────────────────── Express middleware ──────────────────────────

export interface OwnerAuthedRequest extends Request {
  ownerEmail: string;
}

export async function requireOwner(req: Request, res: Response, next: NextFunction) {
  const t = req.cookies?.[COOKIE_OWNER];
  const email = await readOwnerSession(t);
  if (!email) {
    res.status(401).json({ error: "Not signed in" });
    return;
  }
  (req as OwnerAuthedRequest).ownerEmail = email;
  next();
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const t = req.cookies?.[COOKIE_ADMIN];
  const ok = await readAdminSession(t);
  if (!ok) {
    res.status(401).json({ error: "Not signed in" });
    return;
  }
  next();
}

export function setOwnerCookie(res: Response, t: string) {
  res.cookie(COOKIE_OWNER, t, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: OWNER_SESSION_TTL * 1000,
    path: "/",
  });
}

export function clearOwnerCookie(res: Response) {
  res.clearCookie(COOKIE_OWNER, { path: "/" });
}

export function setAdminCookie(res: Response, t: string) {
  res.cookie(COOKIE_ADMIN, t, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_SESSION_TTL * 1000,
    path: "/",
  });
}

export function clearAdminCookie(res: Response) {
  res.clearCookie(COOKIE_ADMIN, { path: "/" });
}
