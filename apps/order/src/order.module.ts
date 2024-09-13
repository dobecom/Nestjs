import { CommonModule } from '@app/common';
import {
  PAYMENT_SERVICE_PROXY,
  SAGA_SERVICE_PROXY,
} from '@app/common/providers/proxy/services.proxy';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { RpcExceptionInterceptor } from '@app/common/interceptors/rpc.intc';
import { ConfigService } from '@nestjs/config';
import { OrderRepository } from './order.repository';
import { ClsModule } from 'nestjs-cls';
import { OrdersEntity } from '@app/common/models/entities/orders.entity';
import { MessageSender } from '@app/common/utils/message.sender';

@Module({
  imports: [
    CommonModule,
    ClsModule.forRoot({
      global: true,
      interceptor: {
        mount: true,
        setup: (cls, context) => {
          cls.set(
            'requestId',
            context.switchToRpc().getData()?.requestId || null
          );
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: +config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USER', 'postgres'),
        password: config.get('DB_PW', 'postgres'),
        database: config.get('DB_NAME', 'postgres'),
        entities: [OrdersEntity],
        keepConnectionAlive: true,
        retryAttempts: 2,
        retryDelay: 1000,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([OrdersEntity]),
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor,
    },
    OrderService,
    OrderRepository,
    MessageSender,
    SAGA_SERVICE_PROXY,
    PAYMENT_SERVICE_PROXY,
  ],
})
export class OrderModule {}
