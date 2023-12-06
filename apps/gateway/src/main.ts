import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const config = app.get(ConfigService);
  app.enableCors({
    origin: (config.get('CORS_ORIGINS') as string).split('||') || [],
    credentials: true,
  });
  await app.listen(config.get('GATEWAY_PORT'));
}
bootstrap();
