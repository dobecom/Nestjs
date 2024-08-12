import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import {
  CreateOrderRequest,
  CreateOrderResponse,
} from '@app/common/open-api/order/create-order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('order-create')
  async addOrder(
    @Payload() data: CreateOrderRequest
  ): Promise<CreateOrderResponse> {
    return await this.orderService.addOrder(data);
  }
}
