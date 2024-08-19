import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { OrderMessage } from '@app/common/providers/messages/order.message';
import { Orders } from '@app/common/models/domains/orders.domain';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern(OrderMessage.ORDER_CREATE)
  async addOrder(
    @Payload('orders') orders: Orders,
    @Payload('user') user: any
  ): Promise<any> {
    orders.userId = user.id;
    return await this.orderService.addOrder(orders);
  }

  @MessagePattern(OrderMessage.ORDER_UPDATE)
  async modifyOrder(
    @Payload('orders') orders: Orders,
    @Payload('user') user: any
  ): Promise<any> {
    orders.userId = user.id;
    return await this.orderService.modifyOrder(orders);
  }
}
