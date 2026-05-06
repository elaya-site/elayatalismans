/**
 * Stock-alert persistence layer.
 *
 * MVP: stores requests in a local JSON file (data/stock-alerts.json).
 * To migrate to Prisma/Turso/Supabase later, replace only the functions
 * in this file — the API route and component stay unchanged.
 *
 * ⚠️  On Vercel (read-only FS), change `DATA_FILE` to `/tmp/stock-alerts.json`
 *     or swap to a real DB adapter.
 */

import path from "path";
import fs   from "fs/promises";

export type StockAlertRequest = {
  id:          string;
  email:       string;
  productId:   string;
  productName: string;
  createdAt:   string; // ISO-8601
};

type Store = { requests: StockAlertRequest[] };

const DATA_FILE = path.join(process.cwd(), "data", "stock-alerts.json");

/* ─── helpers ─── */

async function readStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Store;
  } catch {
    return { requests: [] };
  }
}

async function writeStore(store: Store): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

/* ─── public API ─── */

/** Returns true if the email is already registered for this product. */
export async function isDuplicate(email: string, productId: string): Promise<boolean> {
  const store = await readStore();
  return store.requests.some(
    (r) => r.email.toLowerCase() === email.toLowerCase() && r.productId === productId,
  );
}

/** Saves a new alert request. Throws if duplicate. */
export async function createAlertRequest(
  email: string,
  productId: string,
  productName: string,
): Promise<StockAlertRequest> {
  const store = await readStore();

  if (store.requests.some(
    (r) => r.email.toLowerCase() === email.toLowerCase() && r.productId === productId,
  )) {
    throw new Error("DUPLICATE");
  }

  const entry: StockAlertRequest = {
    id:          crypto.randomUUID(),
    email:       email.toLowerCase().trim(),
    productId,
    productName,
    createdAt:   new Date().toISOString(),
  };

  store.requests.push(entry);
  await writeStore(store);
  return entry;
}

/** Returns all requests (for admin use). */
export async function getAllRequests(): Promise<StockAlertRequest[]> {
  const store = await readStore();
  return store.requests.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/** Returns requests for a specific product. */
export async function getRequestsByProduct(productId: string): Promise<StockAlertRequest[]> {
  const store = await readStore();
  return store.requests.filter((r) => r.productId === productId);
}
