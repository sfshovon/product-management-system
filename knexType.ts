import { Knex } from 'knex';

export interface IKnexConfigType extends Knex.Config {
  development: {
    client: string;
    connection: {
      host: string;
      user: string;
      password: any;
      database: string;
    };
    migrations: {
      directory: string;
    };
    seeds: {
      directory: string;
    };
  };
  production: {
    client: string;
    connection: {
      host: string;
      port: number;
      user: string;
      password: any;
      database: string;
    };
  };
}