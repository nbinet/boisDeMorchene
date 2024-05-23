import { eq, sql } from "drizzle-orm";
import { dog } from "../db/schema.js";
import { db } from "../db/setup.js";

export const findAllDogs = db.select().from(dog).prepare();

export const findDogById = db
    .select({ id: dog.id })
    .from(dog)
    .where(eq(dog.id, sql.placeholder('id')))
    .limit(1)
    .prepare();

export const setDog = db
    .insert(dog)
    .values({
        name: sql.placeholder('name'),
        age: sql.placeholder('age'),
        raceId: sql.placeholder('raceId')
    })
    .prepare();

export const updateDog = db
    .update(dog)
    .set({
        name: sql.placeholder('name'),
        age: sql.placeholder('age'),
        raceId: sql.placeholder('raceId')
    })
    .where(eq(dog.id, sql.placeholder('id')))
    .prepare();

export const deleteDog = db
    .delete(dog)
    .where(eq(dog.id, sql.placeholder('id')))
    .prepare();