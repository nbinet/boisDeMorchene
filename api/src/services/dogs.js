import { eq, sql } from "drizzle-orm";
import { dog } from "../db/schema.js";
import { db } from "../db/setup.js";

export const findAllDogs = db.select().from(dog).prepare();

export const setDog = db
    .insert(dog)
    .values({
        name: sql.placeholder('name'),
        age: sql.placeholder('age'),
        raceId: sql.placeholder('raceId')
    })
    .prepare();