import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('books')
export class BooksController {
  constructor(@Inject('BOOK_SERVICE') private readonly client: ClientKafka) {}
  async onModuleInit() {
    // Kafka 서버에서 생성한 Topic들을 구독
    const requestPatterns = ['test-event'];

    requestPatterns.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    });
    console.log('connecting to kafka');
    // If Kafka server is ready, then connect to it.
    await this.client.connect();
    // console.log('connected to kafka');
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Get('find')
  find() {
    const data = {
      bookName: 'book1',
      author: 'author1',
    };
    // Kafka Topic에 메시지를 전송
    return this.client.emit('test-event', data);
  }
}
