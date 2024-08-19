import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderRepository } from './order.repository';
import { MessageSender } from '@app/common/utils/message.sender';
import { SagaMessage } from '@app/common/providers/messages/saga.message';
import { Orders } from '@app/common/models/domains/orders.domain';

@Injectable()
export class OrderService {
  constructor(
    @Inject('SAGA_SERVICE')
    private readonly sagaCp: ClientProxy,
    private readonly sender: MessageSender,
    private readonly repository: OrderRepository
  ) {}

  async addOrder(orders: Orders) {
    // const result = await this.repository.saveOrder(orders);
    // return {
    //   orders: {
    //     id: result.id,
    //   },
    // };
    return await this.sender.send(
      this.sagaCp,
      SagaMessage.SAGA_ORDER_PAY_CREATE,
      {
        orders,
      }
    );
  }
}
