import { eq, sql } from "drizzle-orm";
import { dog } from "../db/schema.js";
import { db } from "../db/setup.js";

export const findAllDogs = db.select().from(dog).prepare();