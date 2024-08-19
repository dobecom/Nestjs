import { Controller, Get } from '@nestjs/common';
import { SagaService } from './saga.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SagaMessage } from '@app/common/providers/messages/saga.message';
import { Orders } from '@app/common/models/domains/orders.domain';

@Controller()
export class SagaController {
  constructor(private readonly sagaService: SagaService) {}

  @MessagePattern(SagaMessage.SAGA_ORDER_PAY_CREATE)
  async addOrder(@Payload('orders') orders: Orders): Promise<any> {
    console.log('hit');
    console.log(orders);
    return await this.sagaService.addOrder(orders);
  }
}
