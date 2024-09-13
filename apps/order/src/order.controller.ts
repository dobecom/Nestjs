import { Controller, BadRequestException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { OrderMessage } from '@app/common/providers/messages/order.message';
import { Orders } from '@app/common/models/domains/orders.domain';
import { Users } from '@app/common/models/domains/users.domain';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern(OrderMessage.ORDER_CREATE)
  async addOrder(
    @Payload('orders') orders: Orders,
    @Payload('users') users: Users
  ): Promise<any> {
    try {
      orders.userId = users.id;
      return await this.orderService.addOrder(orders);
    } catch (error) {
      throw new BadRequestException('Failed to create order');
    }
  }

  @MessagePattern(OrderMessage.ORDER_UPDATE)
  async modifyOrder(
    @Payload('orders') orders: Orders,
    @Payload('users') users: Users
  ): Promise<any> {
    try {
      orders.userId = users.id;
      return await this.orderService.modifyOrder(orders);
    } catch (error) {
      throw new BadRequestException('Failed to update order');
    }
  }
}
