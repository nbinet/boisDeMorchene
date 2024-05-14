import { eq, sql } from "drizzle-orm";
import { socialNetwork } from "../db/schema.js";
import { db } from "../db/setup.js";

export const findAllSocialNetwork = db.select().from(socialNetwork).prepare();

export const setSocialNetwork = db
    .insert(socialNetwork)
    .values({ label: sql.placeholder('label'), url: sql.placeholder('url') })
    .onDuplicateKeyUpdate({ set: { url: sql.placeholder('url') } })
    .prepare();

export const deleteSocialNetwork = db
    .delete(socialNetwork)
    .where(eq(socialNetwork.id, sql.placeholder('id')))
    .prepare();