import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserRepository } from './repositories/user.repository';
import { SessionSerializer } from './auth.serialize';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        global: true,
        secret: config.get('JWT_ACCESS_TOKEN_SECRET') || 'default',
        signOptions: { expiresIn: '7d' },
      })
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, UserRepository, SessionSerializer],
})
export class AuthModule {}
