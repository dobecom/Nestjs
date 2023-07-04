import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './db/prisma/prisma.module';
import { SchedulerRepository } from './scheduler.repository';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule
  ],
  providers: [SchedulerService, SchedulerRepository]
})
export class SchedulerModule {}
