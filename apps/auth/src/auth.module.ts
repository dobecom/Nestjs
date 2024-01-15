import { CommonModule } from '@app/common';
import { RpcExceptionInterceptor } from '@app/common/interceptors/rpc.intc';
import { UserEntity } from '@app/db/entities/user.entity';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor,
    },
  ],
})
export class AuthModule {}
