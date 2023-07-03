import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AlimtalkTask } from './alimtalk/alimtalk.task';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
  providers: [SchedulerService, AlimtalkTask]
})
export class SchedulerModule {}
