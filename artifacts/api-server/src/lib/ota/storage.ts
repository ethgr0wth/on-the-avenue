/**
 * OTA storage layer.
 *
 * In production (or whenever REDIS_URL is set + OTA_STORAGE !== "memory"),
 * connects to the user's VPS Redis. In development, defaults to a tiny
 * in-memory adapter that mimics the same surface so route code stays
 * identical.
 *
 * All keys are namespaced under `ota:` so this is safe to share with
 * anything else running on the same Redis instance.
 */
import IORedis, { type Redis } from "ioredis";
import { logger } from "../logger";

export interface OtaStorage {
  get(key: string): Promise<string | null>;
  /** Atomic get-and-delete. Returns the value if present, then removes it. */
  getdel(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  del(...keys: string[]): Promise<number>;
  exists(key: string): Promise<boolean>;
  expire(key: string, ttlSeconds: number): Promise<void>;
  incr(key: string): Promise<number>;

  // hash
  hgetall(key: string): Promise<Record<string, string>>;
  hset(key: string, value: Record<string, string>): Promise<void>;
  hdel(key: string, ...fields: string[]): Promise<void>;

  // set
  sadd(key: string, ...members: string[]): Promise<void>;
  srem(key: string, ...members: string[]): Promise<void>;
  smembers(key: string): Promise<string[]>;
  sismember(key: string, member: string): Promise<boolean>;

  // sorted set
  zadd(key: string, score: number, member: string): Promise<void>;
  zrem(key: string, member: string): Promise<void>;
  zrange(key: string, start: number, stop: number): Promise<string[]>;
  zrangebyscore(key: string, min: number, max: number): Promise<string[]>;
}

// ────────────────────────── In-memory adapter ──────────────────────────

class MemoryStorage implements OtaStorage {
  private kv = new Map<string, string>();
  private hashes = new Map<string, Map<string, string>>();
  private sets = new Map<string, Set<string>>();
  private zsets = new Map<string, Map<string, number>>();
  private ttls = new Map<string, NodeJS.Timeout>();
  private counters = new Map<string, number>();

  private clearTtl(key: string) {
    const t = this.ttls.get(key);
    if (t) {
      clearTimeout(t);
      this.ttls.delete(key);
    }
  }

  async get(key: string) {
    return this.kv.get(key) ?? null;
  }
  async getdel(key: string) {
    const v = this.kv.get(key);
    if (v === undefined) return null;
    this.kv.delete(key);
    this.clearTtl(key);
    return v;
  }
  async set(key: string, value: string, ttlSeconds?: number) {
    this.kv.set(key, value);
    this.clearTtl(key);
    if (ttlSeconds && ttlSeconds > 0) {
      const t = setTimeout(() => {
        this.kv.delete(key);
        this.ttls.delete(key);
      }, ttlSeconds * 1000);
      t.unref?.();
      this.ttls.set(key, t);
    }
  }
  async del(...keys: string[]) {
    let n = 0;
    for (const k of keys) {
      const had =
        this.kv.delete(k) ||
        this.hashes.delete(k) ||
        this.sets.delete(k) ||
        this.zsets.delete(k);
      if (had) n++;
      this.clearTtl(k);
    }
    return n;
  }
  async exists(key: string) {
    return (
      this.kv.has(key) ||
      this.hashes.has(key) ||
      this.sets.has(key) ||
      this.zsets.has(key)
    );
  }
  async expire(key: string, ttlSeconds: number) {
    if (!(await this.exists(key))) return;
    this.clearTtl(key);
    const t = setTimeout(() => {
      this.del(key).catch(() => {});
    }, ttlSeconds * 1000);
    t.unref?.();
    this.ttls.set(key, t);
  }
  async incr(key: string) {
    const next = (this.counters.get(key) ?? 0) + 1;
    this.counters.set(key, next);
    return next;
  }

  async hgetall(key: string) {
    const h = this.hashes.get(key);
    if (!h) return {};
    return Object.fromEntries(h.entries());
  }
  async hset(key: string, value: Record<string, string>) {
    let h = this.hashes.get(key);
    if (!h) {
      h = new Map();
      this.hashes.set(key, h);
    }
    for (const [k, v] of Object.entries(value)) h.set(k, v);
  }
  async hdel(key: string, ...fields: string[]) {
    const h = this.hashes.get(key);
    if (!h) return;
    for (const f of fields) h.delete(f);
  }

  async sadd(key: string, ...members: string[]) {
    let s = this.sets.get(key);
    if (!s) {
      s = new Set();
      this.sets.set(key, s);
    }
    for (const m of members) s.add(m);
  }
  async srem(key: string, ...members: string[]) {
    const s = this.sets.get(key);
    if (!s) return;
    for (const m of members) s.delete(m);
  }
  async smembers(key: string) {
    return Array.from(this.sets.get(key) ?? []);
  }
  async sismember(key: string, member: string) {
    return this.sets.get(key)?.has(member) ?? false;
  }

  async zadd(key: string, score: number, member: string) {
    let z = this.zsets.get(key);
    if (!z) {
      z = new Map();
      this.zsets.set(key, z);
    }
    z.set(member, score);
  }
  async zrem(key: string, member: string) {
    this.zsets.get(key)?.delete(member);
  }
  async zrange(key: string, start: number, stop: number) {
    const z = this.zsets.get(key);
    if (!z) return [];
    const sorted = Array.from(z.entries()).sort((a, b) => a[1] - b[1]);
    const end = stop === -1 ? sorted.length : stop + 1;
    return sorted.slice(start, end).map(([m]) => m);
  }
  async zrangebyscore(key: string, min: number, max: number) {
    const z = this.zsets.get(key);
    if (!z) return [];
    return Array.from(z.entries())
      .filter(([, s]) => s >= min && s <= max)
      .sort((a, b) => a[1] - b[1])
      .map(([m]) => m);
  }
}

// ────────────────────────── Redis adapter ──────────────────────────

class RedisStorage implements OtaStorage {
  constructor(private client: Redis) {}

  async get(key: string) {
    return this.client.get(key);
  }
  async getdel(key: string) {
    // ioredis exposes GETDEL on Redis 6.2+. Fall back to a Lua atomic if missing.
    const c = this.client as unknown as { getdel?: (k: string) => Promise<string | null> };
    if (typeof c.getdel === "function") return c.getdel(key);
    const lua = `local v = redis.call('GET', KEYS[1]); if v then redis.call('DEL', KEYS[1]) end; return v`;
    const res = (await this.client.eval(lua, 1, key)) as string | null;
    return res;
  }
  async set(key: string, value: string, ttlSeconds?: number) {
    if (ttlSeconds && ttlSeconds > 0) {
      await this.client.set(key, value, "EX", ttlSeconds);
    } else {
      await this.client.set(key, value);
    }
  }
  async del(...keys: string[]) {
    if (keys.length === 0) return 0;
    return this.client.del(...keys);
  }
  async exists(key: string) {
    return (await this.client.exists(key)) === 1;
  }
  async expire(key: string, ttlSeconds: number) {
    await this.client.expire(key, ttlSeconds);
  }
  async incr(key: string) {
    return this.client.incr(key);
  }
  async hgetall(key: string) {
    return this.client.hgetall(key);
  }
  async hset(key: string, value: Record<string, string>) {
    if (Object.keys(value).length === 0) return;
    await this.client.hset(key, value);
  }
  async hdel(key: string, ...fields: string[]) {
    if (fields.length === 0) return;
    await this.client.hdel(key, ...fields);
  }
  async sadd(key: string, ...members: string[]) {
    if (members.length === 0) return;
    await this.client.sadd(key, ...members);
  }
  async srem(key: string, ...members: string[]) {
    if (members.length === 0) return;
    await this.client.srem(key, ...members);
  }
  async smembers(key: string) {
    return this.client.smembers(key);
  }
  async sismember(key: string, member: string) {
    return (await this.client.sismember(key, member)) === 1;
  }
  async zadd(key: string, score: number, member: string) {
    await this.client.zadd(key, score, member);
  }
  async zrem(key: string, member: string) {
    await this.client.zrem(key, member);
  }
  async zrange(key: string, start: number, stop: number) {
    return this.client.zrange(key, start, stop);
  }
  async zrangebyscore(key: string, min: number, max: number) {
    return this.client.zrangebyscore(key, min, max);
  }
}

// ────────────────────────── Selector ──────────────────────────

let _storage: OtaStorage | null = null;

export function getStorage(): OtaStorage {
  if (_storage) return _storage;

  const mode = process.env.OTA_STORAGE; // "memory" | "redis" | undefined
  const url = process.env.REDIS_URL;
  const isDev = process.env.NODE_ENV !== "production";

  const useMemory =
    mode === "memory" || (!url) || (isDev && mode !== "redis");

  if (useMemory) {
    logger.info(
      { mode: "memory", reason: !url ? "no REDIS_URL" : isDev ? "dev default" : "explicit" },
      "OTA storage: in-memory",
    );
    _storage = new MemoryStorage();
    return _storage;
  }

  logger.info({ mode: "redis" }, "OTA storage: connecting to Redis");
  const client = new IORedis(url!, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: false,
  });
  client.on("error", (err) => logger.error({ err }, "Redis client error"));
  client.on("connect", () => logger.info("Redis connected"));
  _storage = new RedisStorage(client);
  return _storage;
}
