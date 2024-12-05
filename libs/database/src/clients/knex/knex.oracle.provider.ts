import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import knex, { Knex } from 'knex';

@Injectable()
export class KnexOracleProvider implements OnModuleInit, OnModuleDestroy {
  private knexInstance: Knex;
  private readonly logger = new Logger(KnexOracleProvider.name);

  constructor() {
    const knexOracleConfig: Knex.Config = {
      client: 'oracledb',
      connection: {
        user: process.env.ORACLE_USER,
        password: process.env.ORACLE_PASSWORD,
        connectString: process.env.ORACLE_CONNECTION_STRING,
      },
      fetchAsString: ['number', 'clob'],
      pool: { min: 2, max: 10 },
      acquireConnectionTimeout: 10000,
    };
    this.knexInstance = knex(knexOracleConfig);
  }

  get client(): Knex {
    return this.knexInstance;
  }

  async onModuleInit() {
    this.logger.log('Initialized Oracle connection');
  }

  async onModuleDestroy() {
    await this.knexInstance.destroy();
    this.logger.log('Destroyed Oracle connection');
  }
}
