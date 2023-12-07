import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @MessagePattern('order-create')
  createOrder(@Payload() data: any) {
    const { title, description } = data;
    return this.orderService.createOrder(title, description);
  }
}
