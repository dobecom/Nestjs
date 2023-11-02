import { EnvService } from '@app/common/env/env.service';
import { NestFactory } from '@nestjs/core';
import { RedisIoAdapter } from './redis-io.adapter';
import { SocketModule } from './socket.module';

async function bootstrap() {
  const app = await NestFactory.create(SocketModule);
  const envService = new EnvService();
  const redisIoAdapter = new RedisIoAdapter(app, envService);
  redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(7000);
}
bootstrap();
