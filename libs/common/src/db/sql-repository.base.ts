import { Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
// import {
//   DatabasePool,
//   DatabaseTransactionConnection,
//   IdentifierSqlToken,
//   MixedRow,
//   PrimitiveValueExpression,
//   QueryResult,
//   QueryResultRow,
//   sql,
//   SqlSqlToken,
//   UniqueIntegrityConstraintViolationError,
// } from 'slonik';
import { ZodTypeAny, TypeOf, ZodObject } from 'zod';
import { AggregateRoot, Mapper } from '../ddd';
import {
  Paginated,
  PaginatedQueryParams,
  RepositoryPort,
} from '../ddd/repository.port';
import { LoggerPort } from '../ports/logger.port';
import { ObjectLiteral } from '../types';
import { PrismaService } from './prisma/prisma.service';

export abstract class SqlRepositoryBase<
  Aggregate extends AggregateRoot<any>,
  DbModel extends ObjectLiteral,
> implements RepositoryPort<Aggregate>
{
  protected abstract tableName: string;

  protected abstract schema: ZodObject<any>;

  protected constructor(
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly eventEmitter: EventEmitter2,
    protected readonly logger: LoggerPort,
    protected readonly prisma: PrismaService
  ) {}

  insert(entity: Aggregate | Aggregate[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Aggregate[]> {
    throw new Error('Method not implemented.');
  }
  findAllPaginated(
    params: PaginatedQueryParams
  ): Promise<Paginated<Aggregate>> {
    throw new Error('Method not implemented.');
  }
  delete(entity: Aggregate): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  /**
   * start a global transaction to save
   * results of all event handlers in one operation
   */
  public async transaction<T>(handler: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (connection) => {
      // this.logger.debug(
      //   `[${RequestContextService.getRequestId()}] transaction started`,
      // );
      // if (!RequestContextService.getTransactionConnection()) {
      //   RequestContextService.setTransactionConnection(connection);
      // }

      try {
        const result = await handler();
        // this.logger.debug(
        //   `[${RequestContextService.getRequestId()}] transaction committed`,
        // );
        return result;
      } catch (e) {
        // this.logger.debug(
        //   `[${RequestContextService.getRequestId()}] transaction aborted`,
        // );
        throw e;
      } finally {
        // RequestContextService.cleanTransactionConnection();
      }
    });
  }
}
