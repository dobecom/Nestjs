import { EnvService } from '@app/common/env/env.service';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const envService = app.get<EnvService>(EnvService);
  await app.listen(envService.get('GATEWAY_PORT'));
}
bootstrap();
