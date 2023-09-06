import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EnvModule } from '@app/common/env/env.module';
import { SchedulerRepository } from './scheduler.repository';
import { SchedulerService } from './scheduler.service';
import { PrismaModule } from '@app/common/db/prisma/prisma.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    EnvModule
  ],
  providers: [SchedulerService, SchedulerRepository]
})
export class SchedulerModule {}
