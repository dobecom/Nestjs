import { Orders } from '@app/common/models/domains/orders.domain';
import { Pays } from '@app/common/models/domains/pays.domain';
import { OrdersEntity } from '@app/common/models/entities/orders.entity';
import { PaysEntity } from '@app/common/models/entities/pays.entity';
import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

@Injectable()
export class SagaRepository {
  constructor() {}

  async saveOrder(orders: Orders, queryRunner: QueryRunner) {
    const ordersEntity = new OrdersEntity();
    ordersEntity.userId = orders.userId;
    ordersEntity.name = orders.name;
    return await queryRunner.manager.save(ordersEntity);
  }

  async savePay(pays: Pays, queryRunner: QueryRunner) {
    const paysEntity = new PaysEntity();
    paysEntity.userId = pays.userId;
    paysEntity.name = pays.name;
    return await queryRunner.manager.save(paysEntity);
  }
}
