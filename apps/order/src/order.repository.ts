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
}
