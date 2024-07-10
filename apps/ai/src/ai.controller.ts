import { Controller, Get } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get()
  async getHello() {
    const result = await this.aiService.getHello();
    return result;
  }
}
