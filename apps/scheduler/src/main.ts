import { NestFactory } from '@nestjs/core';
import { ConfigEnvService } from 'libs/common/src/config/config-env.service';
import { SchedulerModule } from './scheduler.module';

async function bootstrap() {
  const app = await NestFactory.create(SchedulerModule);
  const configService = app.get(ConfigEnvService);
  await app.listen(configService.get('SCHEDULER_PORT'));
  console.log(`====== Application is running on: ${await app.getUrl()} as ${configService.get('STAGE')} ======`)
}
bootstrap();
