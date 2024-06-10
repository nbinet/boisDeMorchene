import { datetime, int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { socialNetworksAvailable } from "../consts/socialNetworks.js";

export const configuration = mysqlTable('configuration', {
    id: int('id').primaryKey().autoincrement(),
    key: varchar('key', { length: 255 }).notNull().unique(),
    value: text('value').notNull()
});

export const socialNetwork = mysqlTable('social_network', {
    id: int('id').primaryKey().autoincrement(),
    label: varchar('label', { length: 255, enum: socialNetworksAvailable }).notNull().unique(),
    url: varchar('url', { length: 255 })
});

export const race = mysqlTable('race', {
    id: int('id').primaryKey().autoincrement(),
    label: varchar('label', { length: 255}).notNull().unique(),
    slug: varchar('slug', { length: 255}).notNull().unique(),
    description: text('description'),
    order: int('order'),
    image: varchar('image', { length: 255 })
});

export const dog = mysqlTable('dog', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    age: int('age').notNull(),
    raceId: int("race_id").references(() => race.id)
});

export const user = mysqlTable('user', {
    id: int('id').primaryKey().autoincrement(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('pasword', { length: 255 }).notNull(),
});

export const passwordResetRequest = mysqlTable('password_change_request', {
    token: varchar('token', { length: 255 }).primaryKey(),
    time: datetime('time').notNull(),
    user: int('user_id').references(() => user.id)
});