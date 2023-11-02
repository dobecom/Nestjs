import { EnvService } from '@app/common/env/env.service';
import { Module } from '@nestjs/common';
import { RedisIoAdapter } from './redis-io.adapter';
import { SocketController } from './socket.controller';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
  imports: [],
  controllers: [SocketController],
  providers: [
    EnvService,
    SocketService,
    // SocketGateway,
    RedisIoAdapter,
  ],
})
export class SocketModule {}
