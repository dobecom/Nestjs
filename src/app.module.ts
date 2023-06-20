import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { AuthModule } from './api/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BooksModule } from './api/books/books.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    UsersModule,
    SchedulerModule,
    AuthModule,
    PrismaModule,
    BooksModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
