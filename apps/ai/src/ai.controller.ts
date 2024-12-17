import { Body, Controller, Get, Post, Sse } from '@nestjs/common';
import { AiService } from './ai.service';
import { Observable } from 'rxjs';
import { MessageEvent } from '@app/common/ext-http/http.service';

@Controller()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Sse('sse/llama')
  generateMessage(@Body('ai') ai): Observable<MessageEvent> {
    return this.aiService.generateMessage(ai.prompt);
  }

  @Post('rest/llama')
  async getGenMessage(@Body('ai') ai) {
    return this.aiService.asyncGenerateMessage(ai.prompt);
  }

  @Post('rest/openai')
  async testOpenAI() {
    return this.aiService.testOpenAI();
  }

  @Post('rest/anthropic')
  async testAnthropic() {
    return this.aiService.testAnthropic();
  }

  @Post('rest/vertexai')
  async testVertexAI() {
    return this.aiService.testVertexAI();
  }
}
