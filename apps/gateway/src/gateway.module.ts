import { CommonModule } from '@app/common';
import { ORDER_SERVICE_PROXY, PAYMENT_SERVICE_PROXY, USER_SERVICE_PROXY } from '@app/common/proxy/services.proxy';
import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { PaymentController } from './controllers/payment.controller';
import { UserController } from './controllers/user.controller';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [CommonModule],
  controllers: [
    GatewayController,
    UserController,
    OrderController,
    PaymentController,
  ],
  providers: [
    USER_SERVICE_PROXY,
    ORDER_SERVICE_PROXY,
    PAYMENT_SERVICE_PROXY
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
