import { Controller, Get } from '@nestjs/common';
import { SocketService } from './socket.service';

@Controller()
export class SocketController {
  constructor(private readonly socketService: SocketService) {}

  // This is a test API to push messages to the client.
  @Get()
  async pushMessages() {
    return await this.socketService.pushMessages();
  }
}
