import { EnvModule } from '@app/common/env/env.module';
import { DbModule } from '@app/db';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [EnvModule, DbModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
