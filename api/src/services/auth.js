import { eq, sql } from "drizzle-orm";
import { db } from "../db/setup.js";
import { user, user as userTable } from "../db/schema.js";

export const setUser = db
    .insert(user)
    .values({
        email: sql.placeholder('email'),
        password: sql.placeholder('password')
    })
    .prepare();

export const findUserByEmail = db
    .query.user.findFirst({
        where: eq(userTable.email, sql.placeholder('email'))
    })
    .prepare();