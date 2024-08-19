import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaysEntity } from '@app/common/models/entities/pays.entity';
import { ClsModule } from 'nestjs-cls';
import { ConfigService } from '@nestjs/config';
import { PaymentRepository } from './payment.repository';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RpcExceptionInterceptor } from '@app/common/interceptors/rpc.intc';

@Module({
  imports: [
    CommonModule,
    ClsModule.forRoot({
      global: true,
      interceptor: {
        mount: true,
        setup: (cls, context) => {
          cls.set('requestId', context.switchToRpc().getData().requestId);
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('DB_HOST') || 'localhost',
          port: +config.get('DB_PORT') || 5432,
          username: config.get('DB_USER') || 'postgres',
          password: config.get('DB_PW') || 'postgres',
          database: config.get('DB_NAME') || 'postgres',
          entities: [PaysEntity],
          // synchronize: config.get('NODE_ENV') == 'LOCAL' ? true : false,
          keepConnectionAlive: true,
          retryAttempts: 2,
          retryDelay: 1000,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([PaysEntity]),
  ],
  controllers: [PaymentController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor,
    },
    PaymentService,
    PaymentRepository,
  ],
})
export class PaymentModule {}
