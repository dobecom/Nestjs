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

  async updateOrder(orders: Orders): Promise<number> {
    try {
      const result = await this.orderRepository
        .createQueryBuilder()
        .update(OrdersEntity)
        .set({
          name: orders.name,
          ...(orders.status !== undefined && {
            status: () => `status + ${orders.status}`,
          }),
        })
        .where('id = :id', { id: orders.id })
        .returning('id')
        .execute();

      return result.raw[0]?.id || 0;
    } catch (err) {
      throw new Error('Failed to update order');
    }
  }
}
