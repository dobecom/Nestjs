import { EnvService } from '@app/common/env/env.service';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const env = app.get<EnvService>(EnvService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${env.get('RABBITMQ_USER')}:${env.get('RABBITMQ_PW')}@${env.get('BROKER_HOST')}:${env.get('BROKER_PORT')}`,
      ],
      queue: 'user',
      noAck: true,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.startAllMicroservices();
}
bootstrap();
