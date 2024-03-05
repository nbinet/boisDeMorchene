import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import * as schema from './schema.js';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_HOST || ! process.env.DB_USER || !process.env.DB_DATABASE)
    throw new Error("Unable to connect to database");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
});

export const db = drizzle(connection, { schema, logger: true, mode: 'default' });