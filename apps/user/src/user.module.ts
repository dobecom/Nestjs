import { EnvModule } from '@app/common/env/env.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [EnvModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
