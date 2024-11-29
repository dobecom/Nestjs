import { Body, Controller, Post, Sse } from '@nestjs/common';
import { AiService } from './ai.service';
import { Observable } from 'rxjs';
import { MessageEvent } from '@app/common/ext-http/http.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('llama/generate')
  async getGenMessage(@Body('ai') ai) {
    return this.aiService.asyncGenerateMessage(ai.prompt);
  }

  @Sse('generate/llama')
  generateMessage(@Body('ai') ai): Observable<MessageEvent> {
    return this.aiService.generateMessage(ai.prompt);
  }

  @Post('generate/openai')
  async testOpenAI() {
    return this.aiService.testOpenAI();
  }

  @Post('generate/anthropic')
  async testAnthropic() {
    return this.aiService.testAnthropic();
  }

  @Post('generate/vertexai')
  async testVertexAI() {
    return this.aiService.testVertexAI();
  }
}
