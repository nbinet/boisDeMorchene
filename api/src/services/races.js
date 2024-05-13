import { eq, sql } from "drizzle-orm";
import { race } from "../db/schema.js";
import { db } from "../db/setup.js";

export const findAllRaces = db.select().from(race).prepare();

export const findRaceById = db
    .select({ id: race.id })
    .from(race)
    .where(eq(race.id, sql.placeholder('id')))
    .limit(1)
    .prepare();

export const findRaceByLabel = db
    .select({ id: race.id })
    .from(race)
    .where(eq(race.label, sql.placeholder('label')))
    .limit(1)
    .prepare();

export const setRace = db
    .insert(race)
    .values({
        label: sql.placeholder('label'),
        slug: sql.placeholder('slug'),
        description: sql.placeholder('description'),
        image: sql.placeholder('imagePath')
    })
    .onDuplicateKeyUpdate({ set: {
        label: sql.placeholder('label'),
        slug: sql.placeholder('slug'),
        description: sql.placeholder('description'),
        image: sql.placeholder('imagePath')
    } })
    .prepare();

export const deleteRace = db
    .delete(race)
    .where(eq(race.id, sql.placeholder('id')))
    .prepare();