import { int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

export const configuration = mysqlTable('configuration', {
    id: int('id').primaryKey().autoincrement(),
    key: varchar('key', { length: 255 }).notNull().unique(),
    value: text('value').notNull()
})