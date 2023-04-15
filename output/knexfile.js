"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const DB_CONFIGURATION = {
    development: {
        client: 'mysql2',
        connection: {
            host: String(process.env.DB_HOST),
            user: String(process.env.DB_USER),
            password: process.env.DB_PASSWORD,
            database: String(process.env.DB_NAME)
        },
        migrations: {
            directory: './schema/allMigrations',
        },
        seeds: {
            directory: './schema/allSeeds',
        },
    },
    production: {
        client: 'mysql2',
        connection: {
            host: String(process.env.DB_HOST),
            user: String(process.env.DB_USER),
            password: process.env.DB_PASSWORD,
            database: String(process.env.DB_NAME),
            port: Number(process.env.DB_PORT),
        },
    }
};
exports.default = DB_CONFIGURATION;
//# sourceMappingURL=knexfile.js.map