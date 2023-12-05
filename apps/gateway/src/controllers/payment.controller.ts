import { Body, Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('payment')
export class PaymentController {
  constructor(@Inject('PAYMENT_SERVICE') private paymentCp: ClientProxy) {}

  @Get()
  async fetchPayment(@Body() req) {
    try {
      const data = {
        // requestId: uuid(),
        // userAgent: req.headers['user-agent'],
      };
      return lastValueFrom(await this.paymentCp.send('payment-fetch', data));
    } catch (err) {
      console.log(err);
      throw err;
    }
    // 1. catch specific order from observable
    // return new Promise((resolve) => {
    //   result
    //     .pipe(
    //       take(1) //useful if you need the data once and don't want to manually cancel the subscription again
    //     )
    //     .subscribe((data: any) => {
    //       console.log(data);
    //       resolve(data);
    //     });
    // });

    // 2. handling the whole observable
    // const temp = await result.subscribe({
    //   next: (data) => {
    //     console.log(`next : ${JSON.stringify(data)}`);
    //     return data;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     return err;
    //   },
    //   complete: () => {
    //     console.log('complete');
    //     return 'complete';
    //   },
    // });
  }

  /* Kafka registering message patterns */
  // onModuleInit() {
  //   const orderRequestPatterns = ['order-create'];
  //   orderRequestPatterns.forEach((pattern) => {
  //     this.orderClient.subscribeToResponseOf(pattern);
  //   });

  //   const paymentRequestPatterns = ['payment-create', 'payment-fetch'];
  //   paymentRequestPatterns.forEach((pattern) => {
  //     this.paymentClient.subscribeToResponseOf(pattern);
  //   });

  //   this.orderClient.connect();
  //   this.paymentClient.connect();
  // }

  // onModuleDestroy() {
  //   this.orderClient.close();
  //   this.paymentClient.close();
  // }
}
