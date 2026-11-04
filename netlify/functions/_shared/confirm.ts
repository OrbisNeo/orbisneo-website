// Bevestiging van een e-mailadres uit het contactformulier.
//
// Power Automate draait op standaardconnectoren (geen premium) en kan deze
// functie niet aanroepen. Het token ontstaat daar, met guid(), en komt in
// Excel te staan met een kolom Verloopt op (nu + 7 dagen). Deze functie
// weet daardoor niet of een token echt is of verlopen is. Ze bewaart alleen
// een goed gevormd token met het tijdstip van de klik.
//
// Vera leest de registraties via de leesfunctie en vergelijkt het tijdstip
// met Verloopt op in Excel. Ontbreekt de rij, dan was het token niet van
// ons. Ligt de klik na Verloopt op, dan telt ze niet als bevestiging.
//
// Het publieke antwoord is altijd hetzelfde JSON-lichaam, zodat niemand aan
// de functie kan zien welke tokens bestaan.
//
// Leesrecht: omgevingsvariabele VERIFY_READ_SECRET. De waarde hoort alleen
// in Netlify, niet in de repo en niet in deze code.

import { createHash, timingSafeEqual } from "node:crypto";

export const CONFIRM_STORE = "email-confirmations";
export const READ_SECRET_ENV = "VERIFY_READ_SECRET";

// Rem per IP, in het geheugen van deze instantie. Netlify telt daarnaast
// per IP in de function config (dat geldt over instanties heen). Het
// adres wordt niet bij de bevestiging opgeslagen.
export const RATE_LIMIT = 8;
export const RATE_WINDOW_MS = 10 * 60 * 1000;
export const READ_RATE_LIMIT = 30;

export const LIST_CAP = 2000;
export const RETURN_CAP = 1000;

export const NEUTRAL_BODY = { status: "received" } as const;

const TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export interface Confirmation {
  token: string;
  confirmedAt: string;
}

export interface RateRecord {
  windowStart: number;
  count: number;
}

export interface JsonStore {
  setJSON(key: string, data: unknown, options?: { onlyIfNew?: boolean }): Promise<{ modified: boolean }>;
  get(key: string, options: { type: "json" }): Promise<unknown>;
  list(): Promise<{ blobs: { key: string }[] }>;
}

const buckets = new Map<string, RateRecord>();

export function resetRateBuckets(): void {
  buckets.clear();
}

export function readEnv(name: string): string {
  const fromNetlify =
    typeof Netlify !== "undefined" && typeof Netlify.env?.get === "function" ? Netlify.env.get(name) : undefined;
  if (fromNetlify) return fromNetlify;
  return process.env[name] ?? "";
}

export function normalizeToken(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const token = raw.trim().toLowerCase();
  if (!TOKEN_RE.test(token)) return null;
  return token;
}

export function neutralResponse(status = 200): Response {
  return new Response(JSON.stringify(NEUTRAL_BODY), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

export function rateKey(prefix: string, ip: string): string {
  return createHash("sha256").update(`${prefix}\n${ip}`).digest("hex");
}

export function decideRate(
  record: RateRecord | null,
  now: number,
  limit: number,
  windowMs: number,
): { allowed: boolean; next: RateRecord } {
  if (!record || now - record.windowStart >= windowMs) {
    return { allowed: true, next: { windowStart: now, count: 1 } };
  }
  if (record.count >= limit) return { allowed: false, next: record };
  return { allowed: true, next: { windowStart: record.windowStart, count: record.count + 1 } };
}

export function takeRate(prefix: string, ip: string, now: number, limit: number): boolean {
  const key = rateKey(prefix, ip || "onbekend");
  const decision = decideRate(buckets.get(key) ?? null, now, limit, RATE_WINDOW_MS);
  if (!decision.allowed) return false;
  buckets.set(key, decision.next);
  if (buckets.size > 1000) {
    for (const [storedKey, record] of buckets) {
      if (now - record.windowStart >= RATE_WINDOW_MS) buckets.delete(storedKey);
    }
  }
  return true;
}

export function asConfirmation(value: unknown): Confirmation | null {
  if (!value || typeof value !== "object") return null;
  const token = normalizeToken("token" in value ? value.token : undefined);
  const confirmedAt = "confirmedAt" in value ? value.confirmedAt : undefined;
  if (!token || typeof confirmedAt !== "string" || Number.isNaN(Date.parse(confirmedAt))) return null;
  return { token, confirmedAt };
}

export function secretMatches(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b) && expected.length > 0;
}

export function bearerToken(header: string | null): string {
  if (!header) return "";
  const match = /^Bearer\s+(\S+)\s*$/i.exec(header);
  return match ? match[1] : "";
}

async function readPostedToken(req: Request): Promise<string | null> {
  let text = "";
  try {
    text = await req.text();
  } catch {
    return null;
  }
  if (text.length > 4096) return null;
  const type = req.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    try {
      const body = JSON.parse(text) as { token?: unknown };
      return normalizeToken(body.token);
    } catch {
      return null;
    }
  }
  if (type.includes("application/x-www-form-urlencoded")) {
    return normalizeToken(new URLSearchParams(text).get("token"));
  }
  return null;
}

export async function handleConfirm(
  req: Request,
  deps: { ip: string; confirmations: JsonStore; now?: Date },
): Promise<Response> {
  if (req.method !== "POST") return neutralResponse(405);
  const now = deps.now ?? new Date();
  if (!takeRate("c", deps.ip, now.getTime(), RATE_LIMIT)) return neutralResponse(429);

  const token = await readPostedToken(req);
  if (!token) return neutralResponse(200);

  try {
    const confirmedAt = now.toISOString();
    await deps.confirmations.setJSON(token, { token, confirmedAt } satisfies Confirmation, { onlyIfNew: true });
  } catch (err) {
    console.error("confirm-address: opslaan mislukt");
    console.error(err instanceof Error ? err.name : "fout");
    return neutralResponse(500);
  }
  return neutralResponse(200);
}

export async function handleRead(
  req: Request,
  deps: { ip: string; confirmations: JsonStore; now?: Date; secret?: string },
): Promise<Response> {
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    "x-robots-tag": "noindex, nofollow",
  };
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "method" }), { status: 405, headers });
  }

  const now = deps.now ?? new Date();
  if (!takeRate("r", deps.ip, now.getTime(), READ_RATE_LIMIT)) {
    return new Response(JSON.stringify({ error: "rate" }), { status: 429, headers });
  }

  const expected = deps.secret ?? readEnv(READ_SECRET_ENV);
  const provided = bearerToken(req.headers.get("authorization"));
  if (!secretMatches(provided, expected)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers });
  }

  const sinceParam = new URL(req.url).searchParams.get("since");
  let since = Number.NEGATIVE_INFINITY;
  if (sinceParam !== null) {
    const parsed = Date.parse(sinceParam);
    if (Number.isNaN(parsed)) {
      return new Response(JSON.stringify({ error: "since" }), { status: 400, headers });
    }
    since = parsed;
  }

  try {
    const listed = await deps.confirmations.list();
    const keys = listed.blobs.map((blob) => blob.key);
    const truncatedByList = keys.length > LIST_CAP;
    const selected = keys.slice(0, LIST_CAP);
    const rows: Confirmation[] = [];
    for (let i = 0; i < selected.length; i += 20) {
      const chunk = selected.slice(i, i + 20);
      const found = await Promise.all(
        chunk.map(async (key) => asConfirmation(await deps.confirmations.get(key, { type: "json" }))),
      );
      for (const row of found) {
        if (!row) continue;
        if (Date.parse(row.confirmedAt) < since) continue;
        rows.push(row);
      }
    }
    rows.sort((a, b) => (a.confirmedAt < b.confirmedAt ? -1 : a.confirmedAt > b.confirmedAt ? 1 : 0));
    const truncated = truncatedByList || rows.length > RETURN_CAP;
    const confirmations = truncated ? rows.slice(-RETURN_CAP) : rows;
    return new Response(JSON.stringify({ confirmations, truncated }), { status: 200, headers });
  } catch (err) {
    console.error("confirm-address-log: lezen mislukt");
    console.error(err instanceof Error ? err.name : "fout");
    return new Response(JSON.stringify({ error: "store" }), { status: 500, headers });
  }
}
