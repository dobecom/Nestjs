import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchService {
  async fetch(url: string, options?: RequestInit): Promise<any> {
    const response = await fetch(url, options);
    return response.json();
  }
}
