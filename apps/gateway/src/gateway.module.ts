import { CommonModule } from '@app/common';
import { ContextInterceptor } from '@app/common/interceptors/context.interceptor';
import {
  ORDER_SERVICE_PROXY,
  PAYMENT_SERVICE_PROXY,
  USER_SERVICE_PROXY,
} from '@app/common/proxy/services.proxy';
import { DbModule } from '@app/db';
import { UserEntity } from '@app/db/entities/user.entity';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { PaymentController } from './controllers/payment.controller';
import { UserController } from './controllers/user.controller';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [CommonModule, DbModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [
    GatewayController,
    UserController,
    OrderController,
    PaymentController,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ContextInterceptor,
    },
    USER_SERVICE_PROXY,
    ORDER_SERVICE_PROXY,
    PAYMENT_SERVICE_PROXY,
  ],
})
export class GatewayModule {}

// Kafka
// imports: [
//   ClientsModule.register([
//     {
//       name: 'ORDER_SERVICE',
//       transport: Transport.KAFKA,
//       options: {
//         client: {
//           clientId: 'order',
//           brokers: ['localhost:9092'],
//         },
//         consumer: {
//           groupId: 'order-consumer',
//         },
//       },
//     },
//     {
//       name: 'PAYMENT_SERVICE',
//       transport: Transport.KAFKA,
//       options: {
//         client: {
//           clientId: 'payment',
//           brokers: ['localhost:9092'],
//         },
//         consumer: {
//           groupId: 'payment-consumer',
//         },
//       },
//     }
//   ]),
// ],
