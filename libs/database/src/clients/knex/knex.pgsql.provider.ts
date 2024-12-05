import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import knex, { Knex } from 'knex';

@Injectable()
export class KnexPgsqlProvider implements OnModuleInit, OnModuleDestroy {
  private knexInstance: Knex;
  private readonly logger = new Logger(KnexPgsqlProvider.name);

  constructor() {
    const knexPgSqlConfig: Knex.Config = {
      client: 'pg',
      connection: {
        host: process.env.PG_HOST,
        port: +process.env.PG_PORT || 5432,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
      },
      pool: { min: 2, max: 10 },
      acquireConnectionTimeout: 10000,
    };
    this.knexInstance = knex(knexPgSqlConfig);
  }

  get client(): Knex {
    return this.knexInstance;
  }

  async onModuleInit() {
    this.logger.log('Initialized PostgreSQL connection');
  }

  async onModuleDestroy() {
    await this.knexInstance.destroy();
    this.logger.log('Destroyed PostgreSQL connection');
  }
}
