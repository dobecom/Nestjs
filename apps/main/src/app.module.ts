import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { BooksModule } from './api/books/books.module';
import { RedisModule } from './redis/redis.module';
import { PassportModule } from '@nestjs/passport';
import { ClsModule } from 'nestjs-cls';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClsInterceptor } from './interceptors/cls.interceptor';
import { BlockchainModule } from './blockchain/blockchain.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    BooksModule,
    RedisModule,
    PassportModule.register({ session: true }),
    ClsModule.forRoot({
      interceptor: { mount: false },
    }),
    BlockchainModule,
  ],
  providers:[
    {
      provide: APP_INTERCEPTOR,
      useClass: ClsInterceptor
    },
  ]
})
export class AppModule {}
