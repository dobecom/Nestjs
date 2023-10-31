import { Module } from '@nestjs/common';
import { SocketController } from './socket.controller';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
  imports: [],
  controllers: [SocketController],
  providers: [SocketService, SocketGateway],
})
export class SocketModule {}
