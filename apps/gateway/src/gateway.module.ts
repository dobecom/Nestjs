import { EnvModule } from '@app/common/env/env.module';
import { EnvService } from '@app/common/env/env.service';
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { OrderController } from './controllers/order.controller';
import { PaymentController } from './controllers/payment.controller';
import { UserController } from './controllers/user.controller';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [EnvModule],
  controllers: [
    GatewayController,
    UserController,
    OrderController,
    PaymentController,
  ],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: (env: EnvService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${env.get('RABBITMQ_USER')}:${env.get(
                'RABBITMQ_PW'
              )}@${env.get('BROKER_HOST')}:${env.get('BROKER_PORT')}`,
            ],
            queue: 'user',
            noAck: true,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [EnvService],
    },
    {
      provide: 'ORDER_SERVICE',
      useFactory: (env: EnvService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${env.get('RABBITMQ_USER')}:${env.get(
                'RABBITMQ_PW'
              )}@${env.get('BROKER_HOST')}:${env.get('BROKER_PORT')}`,
            ],
            queue: 'order',
            noAck: true,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [EnvService],
    },
    {
      provide: 'PAYMENT_SERVICE',
      useFactory: (env: EnvService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${env.get('RABBITMQ_USER')}:${env.get(
                'RABBITMQ_PW'
              )}@${env.get('BROKER_HOST')}:${env.get('BROKER_PORT')}`,
            ],
            queue: 'payment',
            noAck: true,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [EnvService],
    },
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
