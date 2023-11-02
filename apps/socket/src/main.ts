import { NestFactory } from '@nestjs/core';
import { RedisIoAdapter } from './redis-io.adapter';
import { SocketModule } from './socket.module';

async function bootstrap() {
  const app = await NestFactory.create(SocketModule);
  const redisIoAdapter = new RedisIoAdapter(app);
  redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(7000);
}
bootstrap();
