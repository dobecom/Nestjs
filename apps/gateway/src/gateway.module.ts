import { CommonModule } from '@app/common';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';
import {
  BLOCKCHAIN_SERVICE_PROXY,
  ORDER_SERVICE_PROXY,
  PAYMENT_SERVICE_PROXY,
  USER_SERVICE_PROXY,
} from '@app/common/providers/proxy/services.proxy';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { BlockchainController } from './controllers/blockchain.controller';
import { OrderController } from './controllers/order.controller';
import { PaymentController } from './controllers/payment.controller';
import { UserController } from './controllers/user.controller';
import { RedisModule } from '@app/redis';
import { ClsModule } from 'nestjs-cls';
import { nanoid } from 'nanoid';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GatewayInterceptor } from '@app/common/interceptors/gateway.intc';
import { MessageSender } from '@app/common/utils/message.sender';
import { AuthUserGuard } from './auth/auth.user.guard';
import { AuthUserStrategy } from './auth/auth.user.strategy';
import { AuthAdminGuard } from './auth/auth.admin.guard';
import { AuthAdminStrategy } from './auth/auth.admin.strategy';

@Module({
  imports: [
    CommonModule,
    RedisModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls, req) => {
          cls.set('requestId', nanoid());
        },
      },
    }),
    // DbModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [
    UserController,
    OrderController,
    PaymentController,
    BlockchainController,
  ],
  providers: [
    MessageSender,
    AuthUserGuard,
    AuthUserStrategy,
    AuthAdminGuard,
    AuthAdminStrategy,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GatewayInterceptor,
    },
    USER_SERVICE_PROXY,
    ORDER_SERVICE_PROXY,
    PAYMENT_SERVICE_PROXY,
    BLOCKCHAIN_SERVICE_PROXY,
  ],
})
export class GatewayModule {}
