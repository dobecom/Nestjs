import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Socket, Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;
  private static socketIo: Server;
  private static pubClient;
  private static subClient;

  private ioHandler(io: Server) {
    const pubClient = RedisIoAdapter.pubClient;
    io.on('connection', (socket: Socket) => {
      console.log(`socket connected - socket id [${socket.id}]`);
      socket.join('room1');
      pubClient.publish('room1', 'hello room1');

      socket.on('disconnect', () => {
        console.log(`socket disconnected - socket id [${socket.id}]`);
      });

      socket.on('events', (data) => {
        console.log(data);
      });
    });
  }

  getSocketServer(): Server {
    return RedisIoAdapter.socketIo;
  }

  getPubClient() {
    return RedisIoAdapter.pubClient;
  }

  async connectToRedis(): Promise<void> {
    RedisIoAdapter.pubClient = createClient({ url: `redis://localhost:6379` });
    RedisIoAdapter.subClient = RedisIoAdapter.pubClient.duplicate();

    await Promise.all([
      RedisIoAdapter.pubClient.connect(),
      RedisIoAdapter.subClient.connect(),
    ]);

    this.adapterConstructor = await createAdapter(
      RedisIoAdapter.pubClient,
      RedisIoAdapter.subClient
    );
    RedisIoAdapter.socketIo = await this.createIOServer(7001);

    await this.ioHandler(RedisIoAdapter.socketIo);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
