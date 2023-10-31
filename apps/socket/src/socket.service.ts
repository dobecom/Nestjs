import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class SocketService {
  constructor(private readonly socket:SocketGateway){}
  async getHello() {
    const res = await this.socket.server.emit('events', 'It\'s a message from server')
    console.log(res)
    console.log('hit server')
    return 'Hello World!';
  }
}
