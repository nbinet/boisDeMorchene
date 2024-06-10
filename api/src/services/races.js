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

export const findRaceBySlug = db
    .select({ id: race.id })
    .from(race)
    .where(eq(race.slug, sql.placeholder('slug')))
    .limit(1)
    .prepare();

export const findDetailsBySlug = db
    .query.race.findFirst({
        where: (race, { eq }) => eq(race.slug, sql.placeholder('slug'))
    })
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