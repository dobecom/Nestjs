import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  getPayment(data) {
    const result = {
      ...data,
      payment: 'payment',
    };
    return result;
  }
}
