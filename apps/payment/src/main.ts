import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
        queue: 'payment',
        queueOptions: {
          durable: true,
        },
      },
    }
  );
  app.listen();
}
bootstrap();
