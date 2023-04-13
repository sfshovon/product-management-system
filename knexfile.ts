// Update with your config settings.
import { IKnexConfigType } from "./src/knex/knexType";

export const DB_CONFIGURATION: IKnexConfigType = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: process.env.PASSWORD,
      database: 'product_management_system'
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
  production: {
    client: 'mysql2',
    connection: process.env.DB_URL!,
  }
};
