import { Controller, Get } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern } from '@nestjs/microservices';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Kafka Topic 메시지 패턴 지정
  @MessagePattern('order-create')
  createOrder(
    // @Payload() message: any,
    @Ctx() ctx: KafkaContext
  ) {
    // message payload = context.getMessage().value
    const data = ctx.getMessage().value;
    // console.log(ctx.getTopic());
    // console.log(ctx.getArgs());
    // console.log(ctx.getPartition());
    console.log(data)

    return data;
  }
}
