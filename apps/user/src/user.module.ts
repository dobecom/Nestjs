import { CommonModule } from '@app/common';
import { DbModule } from '@app/db';
import { UserEntity } from '@app/db/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RpcExceptionInterceptor } from '@app/common/interceptors/rpc.intc';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [CommonModule, DbModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor,
    },
  ],
})
export class UserModule {}
