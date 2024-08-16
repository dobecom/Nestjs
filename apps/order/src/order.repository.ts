import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './models/entities/order.entity';
import { Orders } from './models/domains/orders.domain';

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
