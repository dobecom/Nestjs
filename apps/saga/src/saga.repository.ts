import { Injectable } from '@nestjs/common';

@Injectable()
export class SagaRepository {
  getHello(): string {
    return 'Hello World!';
  }
}
