import { EnvService } from '@app/common/env/env.service';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from './entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (env: EnvService) => {
        return {
          type: 'postgres',
          host: env.get('DB_HOST') || 'localhost',
          port: +env.get('DB_PORT') || 5432,
          username: env.get('DB_USER') || 'postgres',
          password: env.get('DB_PW') || 'postgres',
          database: env.get('DB_NAME') || 'postgres',
          entities: [UserEntity, OrderEntity],
          synchronize: true,
          keepConnectionAlive: true,
          retryAttempts: 2,
          retryDelay: 1000,
        };
      },
      inject: [EnvService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class DbModule {}
