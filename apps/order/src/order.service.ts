import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderRepository } from './order.repository';
import { Orders } from './models/domains/orders.domain';

@Injectable()
export class OrderService {
  constructor(
    @Inject('PAYMENT_SERVICE')
    private readonly paymentCp: ClientProxy,
    private readonly repository: OrderRepository
  ) {}

  async addOrder(orders: Orders) {
    const orderList = [];
    // const paymentRequest = await this.paymentCp.send('payment-create', {
    //   userId,
    //   orderList,
    // });
    // const paymentResult = await lastValueFrom(paymentRequest);
    return await this.repository.saveOrder(orders);
  }
}
