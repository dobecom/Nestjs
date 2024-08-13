import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RpcExceptionInterceptor } from '@app/common/interceptors/rpc.intc';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './models/entities/user.entity';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: '127.0.0.1',
          port: 5444,
          username: 'dobecom',
          password: 'custompassword',
          database: 'do_pg_db',
          entities: [UserEntity],
          // synchronize: true,
          keepConnectionAlive: true,
          retryAttempts: 2,
          retryDelay: 1000,
          logging: true,
        };
        // return {
        //   type: 'postgres',
        //   host: config.get('DB_HOST') || 'localhost',
        //   port: +config.get('DB_PORT') || 5432,
        //   username: config.get('DB_USER') || 'postgres',
        //   password: config.get('DB_PW') || 'postgres',
        //   database: config.get('DB_NAME') || 'postgres',
        //   // entities: [UserEntity],
        //   // synchronize: config.get('NODE_ENV') == 'LOCAL' ? true : false,
        //   keepConnectionAlive: true,
        //   retryAttempts: 2,
        //   retryDelay: 1000,
        //   logging: true,
        // };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
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
