import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderRepository } from './order.repository';
import { MessageSender } from '@app/common/utils/message.sender';
import { SagaMessage } from '@app/common/providers/messages/saga.message';
import { Orders } from '@app/common/models/domains/orders.domain';

@Injectable()
export class OrderService {
  constructor(
    @Inject('PAYMENT_SERVICE')
    private readonly paymentCp: ClientProxy,
    @Inject('SAGA_SERVICE')
    private readonly sagaCp: ClientProxy,
    private readonly sender: MessageSender,
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
    // return this.sender.send(this.sagaCp, SagaMessage.SAGA_ORDER_PAY_CREATE, {
    //   orders,
    // });
  }
}
