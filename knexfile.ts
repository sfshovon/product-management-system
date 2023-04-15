// Update with your config settings.
import { IKnexConfigType } from "./knexType";

require('dotenv').config();

const DB_CONFIGURATION: IKnexConfigType = {
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

export default DB_CONFIGURATION;