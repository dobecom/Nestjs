import { Global, Module } from '@nestjs/common';
import { KnexOracleProvider } from './clients/knex/knex.oracle.provider';
import { KnexPgsqlProvider } from './clients/knex/knex.pgsql.provider';

@Global()
@Module({
  providers: [KnexOracleProvider, KnexPgsqlProvider],
  exports: [KnexOracleProvider, KnexPgsqlProvider],
})
export class DatabaseModule {}
