if (!process.env.DB_HOST || ! process.env.DB_USER || !process.env.DB_DATABASE)
    throw new Error("Unable to connect to database");

export default {
    schema: "./src/db/schema.js",
    out: "./src/db/migrations",
    dbCredentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
    },
    driver: "mysql2",
}