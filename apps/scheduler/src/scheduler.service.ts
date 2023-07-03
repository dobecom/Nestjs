import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { AlimtalkTask } from './alimtalk/alimtalk.task';

@Injectable()
export class SchedulerService {
  constructor(private readonly alimtalkTask: AlimtalkTask) {}
  private readonly logger = new Logger(SchedulerService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  test() {
    this.logger.log('HIT : EVERY_10_SECONDS');
    this.alimtalkTask.updateTransferResult();
  }


  //   @Cron('45 * * * * *')
  //   handleCron() {
  //     this.logger.debug('Called when the second is 45');
  //   }

  //   @Interval(10000)
  //   handleInterval() {
  //     this.logger.debug('Called every 10 seconds');
  //   }

  //   @Timeout(5000)
  //   handleTimeout() {
  //     this.logger.debug('Called once after 5 seconds');
  //   }
}