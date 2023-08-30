import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { BooksModule } from './api/books/books.module';
import { RedisModule } from './redis/redis.module';
import { PassportModule } from '@nestjs/passport';
import { ClsModule } from 'nestjs-cls';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BlockchainModule } from './blockchain/blockchain.module';
import { EnvModule } from '@app/common/env/env.module';
import { ContextInterceptor } from './interceptors/context.interceptor';
import { RequestContextModule } from 'nestjs-request-context';

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
    EnvModule,
    RequestContextModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ContextInterceptor,
    },
  ],
})
export class AppModule {}
