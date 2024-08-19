import { Orders } from '@app/common/models/domains/orders.domain';
import { OrderEntity } from '@app/common/models/entities/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) {}

  async saveOrder(orders: Orders) {
    const result = await this.orderRepository.save({
      userId: orders.userId,
      name: orders.name,
    });
    return {
      orders: {
        id: result.id,
      },
    };
  }
}
