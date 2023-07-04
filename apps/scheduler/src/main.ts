import { NestFactory } from '@nestjs/core';
import { SchedulerModule } from './scheduler.module';

async function bootstrap() {
  const app = await NestFactory.create(SchedulerModule);
  await app.listen(process.env.SCHEDULER_PORT);
  console.log(`====== Application is running on: ${await app.getUrl()} as ${process.env.STAGE} ======`)
}
bootstrap();
