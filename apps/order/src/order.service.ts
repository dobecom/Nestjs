import { OrderEntity } from '@app/db/entities/order.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @Inject('PAYMENT_SERVICE')
    private readonly paymentCp: ClientProxy
  ) {}

  async createOrder(data) {
    try {
      const { userId, orderList } = data;
      const paymentRequest = await this.paymentCp.send('payment-create', {
        userId,
        orderList,
      });
      const paymentResult = await lastValueFrom(paymentRequest);

      const orderResult = [];
      for (const order of orderList) {
        const { title, description } = order;
        const saveResult = await this.orderRepository.save({
          title,
          description,
          user: {
            id: userId,
          },
          payment: paymentResult.id,
        });
        if (saveResult) {
          orderResult.push({
            title,
            description,
          });
        }
      }

      return {
        orders: orderResult,
        payment: paymentResult,
      };
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
