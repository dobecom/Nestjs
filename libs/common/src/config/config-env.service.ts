import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigEnvService {
  private readonly envConfig: Record<string, string>;

  constructor() {
    const result = dotenv.config();
    if (result.error) {
      throw result.error;
    }
    this.envConfig = result.parsed;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
