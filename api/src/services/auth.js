import { eq, sql } from "drizzle-orm";
import { db } from "../db/setup.js";
import { passwordResetRequest, user, user as userTable } from "../db/schema.js";

export const setUser = db
    .insert(user)
    .values({
        email: sql.placeholder('email'),
        password: sql.placeholder('password')
    })
    .onDuplicateKeyUpdate({ set: {
        password: sql.placeholder('password'),
    } })
    .prepare();

export const findUserById = db
    .query.user.findFirst({
        where: eq(userTable.id, sql.placeholder('id'))
    })
    .prepare();

export const findUserByEmail = db
    .query.user.findFirst({
        where: eq(userTable.email, sql.placeholder('email'))
    })
    .prepare();

export const newPasswordRequest = db
    .insert(passwordResetRequest)
    .values({
        token: sql.placeholder('token'),
        time: new Date(),
        user: sql.placeholder('userId')
    });

export const findPasswordRequest = db
    .query.passwordResetRequest.findFirst({
        where: eq(passwordResetRequest.token, sql.placeholder('token'))
    })
    .prepare();

export const deletePasswordRequest = db
    .delete(passwordResetRequest)
    .where(eq(passwordResetRequest.token, sql.placeholder('token')))
    .prepare();

export const deletePasswordRequests = db
    .delete(passwordResetRequest)
    .where(eq(passwordResetRequest.user, sql.placeholder('userId')))
    .prepare();