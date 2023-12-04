import { EnvService } from '@app/common/env/env.service';
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'ORDER_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'order',
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'order-consumer',
    //       },
    //     },
    //   },
    //   {
    //     name: 'PAYMENT_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'payment',
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'payment-consumer',
    //       },
    //     },
    //   }
    // ]),
  ],
  controllers: [GatewayController],
  providers: [
    GatewayService,
    EnvService,
    {
      provide: 'ORDER_SERVICE',
      useFactory: (env: EnvService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
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
            urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
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
