import { int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
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
    //todo chiens
});