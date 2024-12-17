import { NestFactory } from '@nestjs/core';
import { AiModule } from './ai.module';

async function bootstrap() {
  const app = await NestFactory.create(AiModule);
  app.setGlobalPrefix('ai');
  await app.listen(4000);
}
bootstrap();
