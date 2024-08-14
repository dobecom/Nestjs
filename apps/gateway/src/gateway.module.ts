import { CommonModule } from '@app/common';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';
import {
  AUTH_SERVICE_PROXY,
  BLOCKCHAIN_SERVICE_PROXY,
  ORDER_SERVICE_PROXY,
  PAYMENT_SERVICE_PROXY,
  USER_SERVICE_PROXY,
} from '@app/common/providers/proxy/services.proxy';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { BlockchainController } from './controllers/blockchain.controller';
import { OrderController } from './controllers/order.controller';
import { PaymentController } from './controllers/payment.controller';
import { UserController } from './controllers/user.controller';
import { RedisModule } from '@app/redis';
import { ClsModule } from 'nestjs-cls';
import { nanoid } from 'nanoid';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls, req) => {
          cls.set('requestId', nanoid());
        },
      },
    }),
  ],
  controllers: [
    UserController,
    OrderController,
    PaymentController,
    BlockchainController,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AUTH_SERVICE_PROXY,
    USER_SERVICE_PROXY,
    ORDER_SERVICE_PROXY,
    PAYMENT_SERVICE_PROXY,
    BLOCKCHAIN_SERVICE_PROXY,
  ],
})
export class GatewayModule {}
