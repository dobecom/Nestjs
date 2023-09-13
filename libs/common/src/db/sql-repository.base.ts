import { EventEmitter2 } from '@nestjs/event-emitter';
import { AggregateRoot, Mapper } from '../ddd';
import {
  RepositoryPort,
} from '../ddd/repository.port';
import { LoggerPort } from '../ports/logger.port';
import { ObjectLiteral } from '../types';
import { PrismaService } from './prisma/prisma.service';

// NOTE: This is a repository base class for Raw SQL queries *NOT ORM(Prisma)*
export abstract class SqlRepositoryBase<
  Aggregate extends AggregateRoot<any>,
  DbModel extends ObjectLiteral,
> implements RepositoryPort<Aggregate>
{
  protected constructor(
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly eventEmitter: EventEmitter2,
    protected readonly logger: LoggerPort,
    protected readonly prisma: PrismaService
  ) {}

  async insert(entity: Aggregate | Aggregate[]): Promise<void> {
    const entities = Array.isArray(entity) ? entity : [entity];
    const records = entities.map(this.mapper.toPersistence);

    // const query = this.generateInsertQuery(records);

    try {
      // await this.writeQuery(query, entities);
    } catch (error) {
      // if (error instanceof UniqueIntegrityConstraintViolationError) {
      
      //   throw new ConflictException('Record already exists', error);
      // }
      throw error;
    }
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
