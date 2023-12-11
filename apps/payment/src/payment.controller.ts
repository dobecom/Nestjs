import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('payment-create')
  createPayment(@Payload() data) {
    return this.paymentService.createPayment(data);
  }

  // delay() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve('done');
  //     }, 5000);
  //   });
  // }
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
