import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { MsaFindbookService } from './msa-findbook.service';

@Controller()
export class MsaFindbookController {
  constructor(private readonly msaFindbookService: MsaFindbookService) {}

  // Kafka Topic 메시지 패턴 지정
  @MessagePattern('test-event')
  findBook(
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
