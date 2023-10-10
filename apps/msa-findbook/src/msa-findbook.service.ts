import { Injectable } from '@nestjs/common';

@Injectable()
export class MsaFindbookService {
  getHello(): string {
    return 'Hello World!';
  }
}
