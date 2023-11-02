import { Injectable } from '@nestjs/common';
import { RedisIoAdapter } from './redis-io.adapter';
// import { SocketGateway } from './socket.gateway';
import { Emitter } from '@socket.io/redis-emitter';

@Injectable()
export class SocketService {
  constructor(
    // private readonly socket: SocetGateway
    private readonly adapter: RedisIoAdapter
  ) {}
  async pushMessages() {
    const redisPubClient = await this.adapter.getPubClient();
    const emitter = await new Emitter(redisPubClient);
    
    // set interval for event trigger
    setInterval(() => {
      emitter
        .to('room1')
        .emit('events', `It\'s a message from the server ${new Date()}`);
    }, 1000);

    return 'Pushing messages...';
  }
}
