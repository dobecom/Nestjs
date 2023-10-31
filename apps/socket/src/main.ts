import { NestFactory } from '@nestjs/core';
import { SocketModule } from './socket.module';

async function bootstrap() {
  const app = await NestFactory.create(SocketModule);
  
  app.enableCors({
    // only for localhost test
		origin: [
      '*',
    ],
		credentials: true,
	});
  await app.listen(7000);
}
bootstrap();
