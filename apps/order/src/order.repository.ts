import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { OrderEntity } from './models/entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) {}

  async saveOrder(data) {
    const orderResult = [];
    // for (const order of orderList) {
    //   const { name, status } = order;
    //   const orderEntity = new OrderEntity();
    //   const userEntity = new UserEntity();
    //   userEntity.id = userId;
    //   // const payEntity = new PayEntity();
    //   // payEntity.id = paymentResult.id;
    //   orderEntity.name = name;
    //   orderEntity.status = status;
    //   orderEntity.user = userEntity;
    //   // orderEntity.payment = paymentEntity;
    //   const saveResult = await queryRunner.manager.save(orderEntity);
    //   if (saveResult) {
    //     orderResult.push({
    //       name,
    //       status,
    //     });
    //   }
    // }
    // await queryRunner.commitTransaction();
    // return {
    //   orders: orderResult,
    //   payment: paymentResult,
    // };
  }
}
