import { RmqExceptionFilter } from '@app/common/filters/rpc-exception.filter';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OrderModule } from './order.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  const config = app.get(ConfigService);

  app.useGlobalFilters(new RmqExceptionFilter());

  app.connectMicroservice<MicroserviceOptions>(
    {
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
    },
    {
      inheritAppConfig: true,
    }
  );
  app.startAllMicroservices();
}
bootstrap();
