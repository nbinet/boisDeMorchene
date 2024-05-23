import { eq, sql } from "drizzle-orm";
import { configuration } from "../db/schema.js";
import { db } from "../db/setup.js";

export const getConfigurationValue = db
    .select({ value: configuration.value })
    .from(configuration)
    .where(eq(configuration.key, sql.placeholder('key')))
    .limit(1)
    .prepare();

export const getConfigurationValues = db
    .select({ key: sql`LOWER(REPLACE(${configuration.key}, ${sql.placeholder('category')}, '')) 'key'`, value: configuration.value })
    .from(configuration)
    .where(sql`${configuration.key} LIKE ${sql.placeholder('categoryLike')}`)
    .prepare();

export const setConfigurationValue = db
    .insert(configuration)
    .values({ key: sql.placeholder('key'), value: sql.placeholder('value') })
    .onDuplicateKeyUpdate({ set: { value: sql.placeholder('value') } });