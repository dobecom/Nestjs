import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';
import { Logger } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ClsService } from 'nestjs-cls';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, {
    logger:
      process.env.NODE_ENV === 'PROD' ? ['error'] : ['error', 'warn', 'log'],
  });
  const config = app.get(ConfigService);
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter(app.get(ClsService)));
  app.enableCors({
    origin: (config.get('CORS_ORIGINS') as string).split('||') || [],
    credentials: true,
  });
  await app.listen(config.get('GATEWAY_PORT'));
}
bootstrap();
