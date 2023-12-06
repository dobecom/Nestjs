import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const USER_SERVICE_PROXY =  {
  provide: 'USER_SERVICE',
  useFactory: (config: ConfigService) => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${config.get('RABBITMQ_USER')}:${config.get(
            'RABBITMQ_PW'
          )}@${config.get('BROKER_HOST')}:${config.get('BROKER_PORT')}`,
        ],
        queue: 'user',
        noAck: true,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [ConfigService],
};

const ORDER_SERVICE_PROXY = {
  provide: 'ORDER_SERVICE',
  useFactory: (config: ConfigService) => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${config.get('RABBITMQ_USER')}:${config.get(
            'RABBITMQ_PW'
          )}@${config.get('BROKER_HOST')}:${config.get('BROKER_PORT')}`,
        ],
        queue: 'order',
        noAck: true,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [ConfigService],
}

const PAYMENT_SERVICE_PROXY =  {
  provide: 'PAYMENT_SERVICE',
  useFactory: (config: ConfigService) => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${config.get('RABBITMQ_USER')}:${config.get(
            'RABBITMQ_PW'
          )}@${config.get('BROKER_HOST')}:${config.get('BROKER_PORT')}`,
        ],
        queue: 'payment',
        noAck: true,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [ConfigService],
};

export { USER_SERVICE_PROXY, ORDER_SERVICE_PROXY, PAYMENT_SERVICE_PROXY}

// export enum ProxyProvider {
//   USER_SERVICE = 'USER_SERVICE',
//   ORDER_SERVICE = 'ORDER_SERVICE',
//   PAYMENT_SERVICE = 'PAYMENT_SERVICE',
// }

// export interface ProxyOptions {
//   provide: ProxyProvider;
//   noAck?: boolean;
//   queueOptions?: any;
// }

// class MicroserviceProxyFactory {
//   static createProxy(option: ProxyOptions) {
//     return {
//       provide: option.provide,
//       useFactory: (config: ConfigService) => {
//         return ClientProxyFactory.create({
//           transport: Transport.RMQ,
//           options: {
//             urls: [
//               `amqp://${config.get('RABBITMQ_USER')}:${config.get(
//                 'RABBITMQ_PW'
//               )}@${config.get('BROKER_HOST')}:${config.get('BROKER_PORT')}`,
//             ],
//             queue: option.provide.split('_')[0],
//             noAck: option.noAck || true,
//             queueOptions: option.queueOptions || {
//               durable: true,
//             },
//           },
//         });
//       },
//       inject: [ConfigService],
//     };
//   }
// }

// const USER_SERVICE_PROXY = MicroserviceProxyFactory.createProxy({
//   provide: ProxyProvider.USER_SERVICE,
// });

// const ORDER_SERVICE_PROXY = MicroserviceProxyFactory.createProxy({
//   provide: ProxyProvider.ORDER_SERVICE,
// });

// const PAYMENT_SERVICE_PROXY = MicroserviceProxyFactory.createProxy({
//   provide: ProxyProvider.PAYMENT_SERVICE,
// });

// export { USER_SERVICE_PROXY, ORDER_SERVICE_PROXY, PAYMENT_SERVICE_PROXY };