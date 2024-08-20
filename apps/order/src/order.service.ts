import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderRepository } from './order.repository';
import { MessageSender } from '@app/common/utils/message.sender';
import { SagaMessage } from '@app/common/providers/messages/saga.message';
import { Orders } from '@app/common/models/domains/orders.domain';
import { PayMessage } from '@app/common/providers/messages/pay.message';

@Injectable()
export class OrderService {
  constructor(
    @Inject('SAGA_SERVICE')
    private readonly sagaCp: ClientProxy,
    @Inject('PAYMENT_SERVICE')
    private readonly payCp: ClientProxy,
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

  async modifyOrder(orders: Orders) {
    let isSuccess = [false, false];
    try {
      const pays = {
        ...orders,
      };
      const payResult = await this.sender.send(
        this.payCp,
        PayMessage.PAY_UPDATE,
        {
          pays,
        }
      );
      if (payResult && payResult.pays && payResult.pays.id === 0) {
        // pay transaction failed
        return 'failed';
      } else {
        isSuccess[0] = true;
      }

      const result = await this.repository.updateOrder(orders);
      if (result === 0) {
        // update failed
        this.cancelPayUpdate(orders);
      }

      return {
        orders: {
          id: result,
        },
        ...payResult,
      };
    } catch (err) {
      if (isSuccess[0]) {
        // compensation transaction
        this.cancelPayUpdate(orders);
      }
      throw err;
    }
  }

  async cancelPayUpdate(pays: any) {
    pays.status = -pays.status;
    return await this.sender.send(this.payCp, PayMessage.PAY_UPDATE_CANCEL, {
      pays,
    });
  }
}
