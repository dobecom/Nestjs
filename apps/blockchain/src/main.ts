import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { BlockchainModule } from './blockchain.module';
var amqp = require('amqplib/callback_api');

// rmq exchange type
enum ExchangeType {
  FANOUT = 'fanout',
  DIRECT = 'direct',
  TOPIC = 'topic',
  HEADERS = 'headers',
}
  function delay() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('done');
      }, 5000);
    });
  }

const rmqListener = (config: any) => {
  const severity = ['warning', 'error'];

  amqp.connect(
    `amqp://${config.get('RABBITMQ_USER')}:${config.get(
      'RABBITMQ_PW'
    )}@${config.get('BROKER_HOST')}:${config.get('BROKER_PORT')}`,
    (err, connection) => {
      if (err) {
        throw new RpcException(err);
      }
      connection.createChannel((chErr, ch) => {
        if (chErr) {
          throw new RpcException(chErr);
        }
        const queueName = 'hello';

        /* Queue process */
        // ch.assertQueue('', {
        //   exclusive: true
        // });
        // ch.consume(queueName, (msg) => {
        //   console.log(" [x] Received %s", msg.content.toString());
        // }, {
        //     noAck: true
        // });

        /* Publish/Subscribe process */
        // ch.assertExchange(queueName, ExchangeType.FANOUT, {
        //   durable: false,
        // });
        // ch.assertQueue('', { exclusive: true },
        //   (queueErr, q) => {
        //     if (queueErr) {
        //       throw new RpcException(queueErr);
        //     }
        //     console.log(
        //       ' [*] Waiting for messages in %s. To exit press CTRL+C',
        //       q.queue
        //     );
        //     ch.bindQueue(q.queue, queueName, '');
        //     ch.consume(q.queue, (msg) => {
        //         console.log(' [x] %s', msg.content.toString());
        //       },
        //       {
        //         noAck: true,
        //       }
        //     );
        //   }
        // );

        /* Routing process */
        // ch.assertExchange(queueName, ExchangeType.DIRECT, {
        //   durable: false,
        // });
        // ch.assertQueue('', { exclusive: true }, (queueErr, q) => {
        //   if (queueErr) {
        //     throw new RpcException(queueErr);
        //   }
        //   console.log(
        //     ' [*] Waiting for messages in %s. To exit press CTRL+C',
        //     q.queue
        //   );

        //   severity.forEach((severity) => {
        //     ch.bindQueue(q.queue, queueName, severity);
        //   });

        //   ch.consume(
        //     q.queue,
        //     (msg) => {
        //       console.log(' [x] %s', msg.content.toString());
        //     },
        //     {
        //       noAck: true,
        //     }
        //   );
        // });

        /* RPC process */
        ch.assertQueue(queueName, {
          durable: false
        });
        ch.prefetch(1); // the number of tasks that the worker can do at a time
        console.log(' [x] Awaiting RPC requests');
        ch.consume(queueName, async function reply(msg) {
          console.log(' [.] Received %s', msg.content.toString());
          const r = await delay();
    
          await ch.sendToQueue(msg.properties.replyTo,
            Buffer.from(r.toString()), {
              correlationId: msg.properties.correlationId
            });
    
          await ch.ack(msg);
        });
      });
    }
  );
};

async function bootstrap() {
  const app = await NestFactory.create(BlockchainModule);
  const config = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${config.get('RABBITMQ_USER')}:${config.get(
            'RABBITMQ_PW'
          )}@${config.get('BROKER_HOST')}:${config.get('BROKER_PORT')}`,
        ],
        queue: 'blockchain',
        noAck: true,
        queueOptions: {
          durable: false,
        },
      },
    },
    {
      inheritAppConfig: true,
    }
  );
  app.startAllMicroservices();

  rmqListener(config);
}
bootstrap();
