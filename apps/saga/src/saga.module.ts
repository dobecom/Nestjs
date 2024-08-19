import { Module } from '@nestjs/common';
import { SagaController } from './saga.controller';
import { SagaService } from './saga.service';
import { CommonModule } from '@app/common';
import { ClsModule } from 'nestjs-cls';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RpcExceptionInterceptor } from '@app/common/interceptors/rpc.intc';
import { SagaRepository } from './saga.repository';
import { SAGA_SERVICE_PROXY } from '@app/common/providers/proxy/services.proxy';
import { UserEntity } from '@app/common/models/entities/user.entity';
import { OrderEntity } from '@app/common/models/entities/order.entity';

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
          entities: [UserEntity, OrderEntity],
          // synchronize: config.get('NODE_ENV') == 'LOCAL' ? true : false,
          keepConnectionAlive: true,
          retryAttempts: 2,
          retryDelay: 1000,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([OrderEntity]),
  ],
  controllers: [SagaController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor,
    },
    SagaService,
    SagaRepository,
    SAGA_SERVICE_PROXY,
  ],
})
export class SagaModule {}
