import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject('PAYMENT_SERVICE')
    private readonly paymentCp: ClientProxy,
    private readonly repository: OrderRepository
  ) {}

  async addOrder(data) {
    const userId = 1;
    const orderList = [];
    const paymentRequest = await this.paymentCp.send('payment-create', {
      userId,
      orderList,
    });
    const paymentResult = await lastValueFrom(paymentRequest);
    this.repository.saveOrder(data);
    return null;
  }
}
