import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  delay() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('done');
      }, 5000);
    });
  }

  @MessagePattern('payment-fetch')
  fetchPayment(@Payload() data, @Ctx() context: RmqContext) {
      return this.paymentService.getPayment(data);
      
      // Example for Observable continuous 5 times return
      // const observable$ = interval(1000).pipe(
      //   take(5),
      //   map(index => {
      //     const newData = {
      //       status: 'done',
      //       index: index + 1,
      //     };
      //     return {
      //       ...data,
      //       ...newData,
      //     };
      //   })
      // );
      // // Observable을 구독하고 그 결과를 반환
      // return await observable$;
  }
}
