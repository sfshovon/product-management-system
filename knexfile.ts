// Update with your config settings.
import { IKnexConfigType } from "./knexType";

const DB_CONFIGURATION: IKnexConfigType  = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'product_management_system'
    },
    migrations: {
      directory: './schema/migrations',
    },
    seeds: {
      directory: './schema/seeds',
    },
  },
  production: {
    client: 'mysql2',
    connection: process.env.DB_URL!,
  }
};
export default DB_CONFIGURATION;
