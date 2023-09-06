import { Module, Provider } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { RedisService } from '../../redis/redis.service';
import { ClsModule } from 'nestjs-cls';
import { EnvService } from '@app/common/env/env.service';
import { UserMapper } from './user.mapper';
import { PrismaService } from '@app/common/db/prisma/prisma.service';

const mappers: Provider[] = [UserMapper];

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
  ],
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersService,
    UserRepository,
    RedisService,
    EnvService,
    ...mappers,
  ],
})
export class UsersModule {}
