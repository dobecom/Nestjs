import { DbModule } from '@app/db';
import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { ClsModule } from 'nestjs-cls';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
  ],
  exports: [Logger],
  providers: [JwtService, Logger],
})
export class CommonModule {}
