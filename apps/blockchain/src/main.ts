import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BlockchainModule } from './blockchain.module';

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
}
bootstrap();
