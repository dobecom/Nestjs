import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
  constructor(@Inject('ORDER_SERVICE') private orderCp: ClientProxy) {}

  @Post()
  createOrder() {
    // const data = { orderName: 'order1' };
    // return this.orderClient.send('order-create', data);
  }
}
