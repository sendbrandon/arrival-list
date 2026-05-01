import { Redis } from "@upstash/redis";

const COUNTER_KEY = "arrival-list:ticket-counter";
const TICKET_PREFIX = "arrival-list:ticket:";

export const SEED_OFFSET = 3;

let cached: Redis | null | undefined;

function client(): Redis | null {
  if (cached !== undefined) return cached;
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.REDIS_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.REDIS_TOKEN;
  if (!url || !token) {
    cached = null;
    return null;
  }
  cached = new Redis({ url, token });
  return cached;
}

export function isStorageConfigured(): boolean {
  return client() !== null;
}

function toNumber(v: unknown): number | null {
  if (v == null) return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const n = parseInt(String(v), 10);
  return Number.isFinite(n) ? n : null;
}

export async function readCounter(): Promise<number | null> {
  const r = client();
  if (!r) return null;
  return toNumber(await r.get(COUNTER_KEY));
}

export async function readTicket(emailHash: string): Promise<number | null> {
  const r = client();
  if (!r) return null;
  return toNumber(await r.get(`${TICKET_PREFIX}${emailHash}`));
}

export async function allocateTicket(emailHash: string): Promise<number | null> {
  const r = client();
  if (!r) return null;
  const existing = await readTicket(emailHash);
  if (existing) return existing;
  // SETNX seeds the counter on first use only; INCR is the atomic source of truth.
  await r.setnx(COUNTER_KEY, SEED_OFFSET);
  const num = await r.incr(COUNTER_KEY);
  await r.set(`${TICKET_PREFIX}${emailHash}`, num);
  return num;
}

export async function importExistingTicket(emailHash: string, num: number): Promise<void> {
  const r = client();
  if (!r) return;
  await r.set(`${TICKET_PREFIX}${emailHash}`, num);
  // Bump the counter so future allocations never collide with imported numbers.
  // Single-writer migration only — no concurrent allocator should be running.
  const current = (await readCounter()) ?? SEED_OFFSET;
  if (num > current) {
    await r.set(COUNTER_KEY, num);
  }
}
