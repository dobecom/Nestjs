import { OrderEntity } from '@app/db/entities/order.entity';
import { PaymentEntity } from '@app/db/entities/payment.entity';
import { UserEntity } from '@app/db/entities/user.entity';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @Inject('PAYMENT_SERVICE')
    private readonly paymentCp: ClientProxy
  ) {}

  async createOrder(data) {
    const queryRunner = await this.dataSource.createQueryRunner();
    const { userId, orderList } = data;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const paymentRequest = await this.paymentCp.send('payment-create', {
        userId,
        orderList,
      });
      const paymentResult = await lastValueFrom(paymentRequest);
      
      const orderResult = [];
      for (const order of orderList) {
        const { title, description } = order;

        const orderEntity = new OrderEntity();
        const userEntity = new UserEntity();
        userEntity.id = userId;
        const paymentEntity = new PaymentEntity();
        paymentEntity.id = paymentResult.id;
        orderEntity.title = title;
        orderEntity.description = description;
        orderEntity.user = userEntity;
        orderEntity.payment = paymentEntity;

        const saveResult = await queryRunner.manager.save(orderEntity);
        
        if (saveResult) {
          orderResult.push({
            title,
            description,
          });
        }
      }
      await queryRunner.commitTransaction();
      return {
        orders: orderResult,
        payment: paymentResult,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new RpcException(err);
    } finally {
      await queryRunner.release();
    }
  }
}