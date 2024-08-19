import { Orders } from '@app/common/models/domains/orders.domain';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SagaRepository } from './saga.repository';
import { DataSource } from 'typeorm';
import { Pays } from '@app/common/models/domains/pays.domain';
import { ErrorCodes } from '@app/common/code/error.code';

@Injectable()
export class SagaService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly repository: SagaRepository
  ) {}

  async addOrder(orders: Orders) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderResult = await this.repository.saveOrder(orders, queryRunner);

      const pays = {
        userId: orders.userId,
        name: orders.name,
      } as Pays;
      const payResult = await this.repository.savePay(pays, queryRunner);

      await queryRunner.commitTransaction();
      return { orderResult, payResult };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({
        code: ErrorCodes.IS002,
      });
    } finally {
      await queryRunner.release();
    }
  }
}
