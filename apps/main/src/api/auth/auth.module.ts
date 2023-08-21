import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserRepository } from './repositories/user.repository';
import { SessionSerializer } from './auth.serialize';
import { ConfigEnvService } from 'libs/common/src/config/config-env.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigEnvService],
      useFactory: async (configService: ConfigEnvService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      })
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, UserRepository, SessionSerializer],
})
export class AuthModule {}
