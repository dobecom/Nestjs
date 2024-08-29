import { NestFactory } from '@nestjs/core';
import { GqlModule } from './gql.module';

async function bootstrap() {
  const app = await NestFactory.create(GqlModule);
  await app.listen(3000);
}
bootstrap();
