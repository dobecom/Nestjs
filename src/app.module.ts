import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { AuthModule } from './api/auth/auth.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { BooksModule } from './api/books/books.module';
import { RedisModule } from './redis/redis.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    SchedulerModule,
    AuthModule,
    PrismaModule,
    BooksModule,
    RedisModule,
    PassportModule.register({ session: true }),
  ],
})
export class AppModule {}
