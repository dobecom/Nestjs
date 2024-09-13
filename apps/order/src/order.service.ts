import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessageSender } from '@app/common/utils/message.sender';
import { OrderRepository } from './order.repository';
import { Orders } from '@app/common/models/domains/orders.domain';
import { SagaMessage } from '@app/common/providers/messages/saga.message';
import { PayMessage } from '@app/common/providers/messages/pay.message';

@Injectable()
export class OrderService {
  constructor(
    @Inject('SAGA_SERVICE') private readonly sagaCp: ClientProxy,
    @Inject('PAYMENT_SERVICE') private readonly payCp: ClientProxy,
    private readonly sender: MessageSender,
    private readonly repository: OrderRepository
  ) {}

  async addOrder(orders: Orders) {
    return this.sender.send(this.sagaCp, SagaMessage.SAGA_ORDER_PAY_CREATE, {
      orders,
    });
  }

  async modifyOrder(orders: Orders) {
    let isSuccess = false;
    try {
      const payResult = await this.sender.send(
        this.payCp,
        PayMessage.PAY_UPDATE,
        { pays: { ...orders } }
      );

      if (!payResult || !payResult.pays || payResult.pays.id === 0) {
        return 'failed';
      }
      isSuccess = true;

      const updatedId = await this.repository.updateOrder(orders);
      if (updatedId === 0) {
        await this.cancelPayUpdate(orders);
        return 'failed';
      }

      return { orders: { id: updatedId }, ...payResult };
    } catch (err) {
      if (isSuccess) {
        await this.cancelPayUpdate(orders);
      }
      throw new InternalServerErrorException('Failed to modify order');
    }
  }

  private async cancelPayUpdate(orders: Orders) {
    orders.status = -orders.status;
    return this.sender.send(this.payCp, PayMessage.PAY_UPDATE_CANCEL, {
      pays: orders,
    });
  }
}
