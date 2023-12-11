import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ClsService } from 'nestjs-cls';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const config = app.get(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter(app.get(ClsService)));
  app.enableCors({
    origin: (config.get('CORS_ORIGINS') as string).split('||') || [],
    credentials: true,
  });
  await app.listen(config.get('GATEWAY_PORT'));
}
bootstrap();
