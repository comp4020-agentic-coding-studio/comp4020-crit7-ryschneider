import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import Database from "better-sqlite3";
import { and, desc, eq, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { type Swap, swaps } from "./schema";

// One SQLite file is the app's whole persistent state. In production
// fly.toml points DATABASE_PATH at the machine's volume (/data), which is
// how state survives a reload and a redeploy; locally it defaults to an
// untracked file in .data/.
const path = process.env.DATABASE_PATH ?? "./.data/app.db";
mkdirSync(dirname(path), { recursive: true });

const client = new Database(path);
client.pragma("journal_mode = WAL");

export const db = drizzle(client);

// Migrations run at boot, on whatever machine holds the volume — the
// recommended shape for SQLite on Fly, where there's no separate machine to
// run them from. The flow: edit src/lib/schema.ts, `pnpm db:generate`,
// commit the migration it writes to drizzle/.
migrate(db, { migrationsFolder: "./drizzle" });

export type { Swap };

export function listSwaps(): Swap[] {
  return db.select().from(swaps).orderBy(desc(swaps.id)).limit(50).all();
}

export function addSwap(name: string, have: string, want: string): Swap {
  return db.insert(swaps).values({ name, have, want }).returning().get();
}

// Only claims a swap that's still open (claimed_by is null): the WHERE
// guards against two people claiming the same swap in the same instant.
// Returns undefined if the swap was already claimed or doesn't exist.
export function claimSwap(id: number, claimedBy: string): Swap | undefined {
  return db
    .update(swaps)
    .set({ claimedBy })
    .where(and(eq(swaps.id, id), isNull(swaps.claimedBy)))
    .returning()
    .get();
}
