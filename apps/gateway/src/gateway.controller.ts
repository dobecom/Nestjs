import { Controller, Get, Inject, Post, Request } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, take } from 'rxjs';
import { GatewayService } from './gateway.service';
import { v4 as uuid } from 'uuid';

@Controller()
export class GatewayController {
  constructor(
    // @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
    // @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientKafka
    @Inject('ORDER_SERVICE') private orderCp: ClientProxy,
    @Inject('PAYMENT_SERVICE') private paymentCp: ClientProxy,
  ) 
  {}
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

  @Post('order')
  createOrder() {
    // const data = { orderName: 'order1' };
    // return this.orderClient.send('order-create', data);
  }

  @Get('payment')
  async fetchPayment(@Request() req) {
    try {
      const data = {
        requestId : uuid(),
        userAgent : req.headers['user-agent'],

      }
      const result = await this.paymentCp.send('payment-fetch', data);
      // return await lastValueFrom(result);
      return new Promise(resolve=>{
        result.pipe(
           take(4) //useful if you need the data once and don't want to manually cancel the subscription again
         )
         .subscribe(
            (data:any) => {
                console.log(data);
                resolve(data);
         })
    })
      const temp = await result.subscribe({
        next: (data) => {
          console.log(`next : ${JSON.stringify(data)}`)
          return data;
        },
        error: (err) => {
          console.log(err)
          return err;
        },
        complete: () => {
          console.log('complete')
          return 'complete';
        },
      })
      console.log(temp)
      return temp;
      // const data = { paymentId: 'payment1' };
      // return this.paymentClient.send('payment-fetch', data);
    }catch(err){
      console.log(err)
    }
  }
}
