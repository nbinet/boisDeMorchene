import { int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

export const configuration = mysqlTable('configuration', {
    id: int('id').primaryKey().autoincrement(),
    key: varchar('key', { length: 255 }).notNull().unique(),
    value: text('value').notNull()
});

export const socialNetwork = mysqlTable('social_network', {
    id: int('id').primaryKey().autoincrement(),
    label: varchar('label', { length: 255, enum: ['facebook', 'instagram', 'linkedin', 'youtube', 'vimeo', 'twitter'] }).notNull().unique(),
    url: varchar('url', { length: 255 })
});