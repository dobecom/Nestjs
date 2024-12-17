import { Body, Controller, Get, Post } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Controller('puppeteer')
export class PuppeteerController {
  constructor(private readonly puppeteerService: PuppeteerService) {}

  @Post('process')
  async processPrompt(@Body('ai') ai: { prompt: string }) {
    return await this.puppeteerService.handlePrompt(ai.prompt);
  }
}
