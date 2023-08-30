import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserRepository } from './repositories/user.repository';
import { SessionSerializer } from './auth.serialize';
import { EnvService } from '@app/common/env/env.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        global: true,
        secret: envService.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      })
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, UserRepository, SessionSerializer],
})
export class AuthModule {}
