import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SagaModule } from './saga.module';

async function bootstrap() {
  const app = await NestFactory.create(SagaModule);
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
        queue: 'saga',
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
