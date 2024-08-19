import { Orders } from '@app/common/models/domains/orders.domain';
import { OrdersEntity } from '@app/common/models/entities/orders.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly orderRepository: Repository<OrdersEntity>
  ) {}

  // async saveOrder(orders: Orders) {
  //   return await this.orderRepository.save({
  //     userId: orders.userId,
  //     name: orders.name,
  //   });
  // }

  async updateOrder(orders: Orders) {
    const ordersEntity = new OrdersEntity();
    ordersEntity.id = orders.id;
    ordersEntity.name = orders.name;

    const queryBuilder = this.orderRepository
      .createQueryBuilder()
      .update(OrdersEntity)
      .set({
        name: orders.name,
        ...(orders.status !== undefined && {
          status: () => `status + ${orders.status}`,
        }),
      })
      .where('id = :id', { id: orders.id })
      .returning('id');
    const result = await queryBuilder.execute();
    const updatedId = result.raw[0].id;

    return +updatedId;
  }
}
