import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from './entities/user.entity';

@Global()
@Module({
  imports: [
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
          synchronize: config.get('NODE_ENV') == 'LOCAL' ? true : false,
          keepConnectionAlive: true,
          retryAttempts: 2,
          retryDelay: 1000,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [Repository],
  providers: [Repository],
})
export class DbModule {}
