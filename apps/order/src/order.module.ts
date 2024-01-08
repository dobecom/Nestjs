import { CommonModule } from '@app/common';
import { RpcExceptionInterceptor } from '@app/common/interceptors/rpc.interceptor';
import { PAYMENT_SERVICE_PROXY } from '@app/common/providers/proxy/services.proxy';
import { DbModule } from '@app/db';
import { OrderEntity } from '@app/db/entities/order.entity';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [CommonModule, DbModule, TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor,
    },
    OrderService,
    PAYMENT_SERVICE_PROXY,
  ],
})
export class OrderModule {}
