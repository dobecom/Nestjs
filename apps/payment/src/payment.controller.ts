import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { PayMessage } from '@app/common/providers/messages/pay.message';
import { Pays } from '@app/common/models/domains/pays.domain';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern(PayMessage.PAY_UPDATE)
  async modifyPay(@Payload('pays') pays: Pays): Promise<any> {
    return await this.paymentService.modifyPay(pays);
  }

  @MessagePattern(PayMessage.PAY_UPDATE_CANCEL)
  async modifyCancelPay(@Payload('pays') pays: Pays): Promise<any> {
    return await this.paymentService.modifyCancelPay(pays);
  }

  // @EventPattern('payment-list')
  // getListPayment(@Payload() data) {
  //   console.log('payment-list');
  //   return 'payment-list';
  // }

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
