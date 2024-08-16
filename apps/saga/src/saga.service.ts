import { Injectable } from '@nestjs/common';

@Injectable()
export class SagaService {
  getHello(): string {
    return 'Hello World!';
  }
}
