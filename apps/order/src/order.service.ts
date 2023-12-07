import { OrderEntity } from '@app/db/entities/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) {}

  async createOrder(title: string, description: string) {
    const result = await this.orderRepository.save({ title, description });
    return result;
  }
}
