import { eq, sql } from "drizzle-orm";
import { race } from "../db/schema.js";
import { db } from "../db/setup.js";

export const findAllRaces = db.select().from(race).prepare();

export const setRace = db
    .insert(race)
    .values({
        label: sql.placeholder('label'),
        slug: sql.placeholder('slug'),
        description: sql.placeholder('description'),
    })
    .onDuplicateKeyUpdate({ set: {
        label: sql.placeholder('label'),
        slug: sql.placeholder('slug'),
        description: sql.placeholder('description'),
    } })
    .prepare();

export const deleteRace = db
    .delete(race)
    .where(eq(race.id, sql.placeholder('id')))
    .prepare();