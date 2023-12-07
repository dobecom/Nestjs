import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
  constructor(@Inject('ORDER_SERVICE') private orderCp: ClientProxy) {}

  @Post()
  createOrder(@Body() req) {
    return this.orderCp.send('order-create', req);
  }
}
