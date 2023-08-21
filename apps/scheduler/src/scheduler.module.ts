import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigEnvModule } from 'libs/common/src/config/config-env.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { SchedulerRepository } from './scheduler.repository';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    ConfigEnvModule
  ],
  providers: [SchedulerService, SchedulerRepository]
})
export class SchedulerModule {}
