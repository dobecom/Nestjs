import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { firstValueFrom, interval, lastValueFrom, map, take } from 'rxjs';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  delay(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('done');
      }, 5000);
    });
  }

  @MessagePattern('payment-fetch')
  async fetchPayment(@Payload() data: number[], @Ctx() context: RmqContext) {
    try {
      // console.log(data);
      // let newData = {
      //   status: 'init'
      // };
      // await this.delay().then(()=>{
      //   console.log('handled data')
      //   newData.status = 'done';
      // });
      // return await {
      //   ...data,
      //   ...newData,
      // };
        // 이 예시에서는 interval을 사용하여 5개의 값을 1초 간격으로 생성
    const observable$ = interval(1000).pipe(
      take(5),
      map(index => {
        const newData = {
          status: 'done',
          index: index + 1,
        };
        return {
          ...data,
          ...newData,
        };
      })
    );

    // Observable을 구독하고 그 결과를 반환
    return await observable$;
    } catch (err) {
      console.log(err);
    }
  }
}
