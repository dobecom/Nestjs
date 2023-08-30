import { NestFactory } from '@nestjs/core';
import { EnvService } from '@app/common/env/env.service';
import { SchedulerModule } from './scheduler.module';

async function bootstrap() {
  const app = await NestFactory.create(SchedulerModule);
  const envService = app.get(EnvService);
  await app.listen(envService.get('SCHEDULER_PORT'));
  console.log(`====== Application is running on: ${await app.getUrl()} as ${envService.get('STAGE')} ======`)
}
bootstrap();
