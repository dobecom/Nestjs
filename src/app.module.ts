import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [UsersModule, ScheduleModule.forRoot(), SchedulerModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
