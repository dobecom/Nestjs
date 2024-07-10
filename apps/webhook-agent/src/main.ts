import { NestFactory } from '@nestjs/core';
import { WebhookAgentModule } from './webhook-agent.module';

async function bootstrap() {
  const app = await NestFactory.create(WebhookAgentModule);
  await app.listen(3000);
}
bootstrap();
