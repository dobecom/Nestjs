import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserRepository } from './repositories/user.repository';
import { SessionSerializer } from './auth.serialize';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, UserRepository, SessionSerializer]
})
export class AuthModule {}
