import { PaymentEntity } from '@app/db/entities/payment.entity';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>
  ) {}

  async createPayment(data) {
    const { userId, orderList } = data;
    try {
      const description =
        orderList
          .map((order, index) => {
            if (index < 3) return order.title;
          })
          .join(', ') + `등 ${orderList.length}개의 주문`;

      const result = await this.paymentRepository.save({
        title: `${new Date().getTime().toString()}_${userId}`,
        description,
        user: {
          id: userId,
        },
      });
      return result;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
