import { EnvService } from '@app/common/env/env.service';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const envService = app.get<EnvService>(EnvService);
  app.enableCors({
    origin: (envService.get('CORS_ORIGINS') as string).split('||') || [],
    credentials: true,
  });
  await app.listen(envService.get('GATEWAY_PORT'));
}
bootstrap();
