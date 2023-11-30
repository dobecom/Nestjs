import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientKafka
  ) 
  {}

  onModuleInit() {
    const orderRequestPatterns = ['order-create'];
    orderRequestPatterns.forEach((pattern) => {
      this.orderClient.subscribeToResponseOf(pattern);
    });

    const paymentRequestPatterns = ['payment-create', 'payment-fetch'];
    paymentRequestPatterns.forEach((pattern) => {
      this.paymentClient.subscribeToResponseOf(pattern);
    });

    this.orderClient.connect();
    this.paymentClient.connect();
  }

  onModuleDestroy() {
    this.orderClient.close();
    this.paymentClient.close();
  }

  @Post('order')
  createOrder() {
    const data = { orderName: 'order1' };
    return this.orderClient.send('order-create', data);
  }

  @Get('payment')
  fetchPayment() {
    const data = { paymentId: 'payment1' };
    return this.paymentClient.send('payment-fetch', data);
  }
}
