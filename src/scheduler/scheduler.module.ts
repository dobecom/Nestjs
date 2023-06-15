import { Module } from '@nestjs/common';
import { AlimtalkTask } from './alimtalk/alimtalk.task';
import { SchedulerService } from './scheduler.service';

@Module({
  providers: [SchedulerService, AlimtalkTask]
})
export class SchedulerModule {}
