import { Controller, Post, Req } from '@nestjs/common';
import { WebhookAgentService } from './webhook-agent.service';

@Controller()
export class WebhookAgentController {
  constructor(private readonly webhookAgentService: WebhookAgentService) {}

  @Post()
  async sendTelegramMessage(@Req() req: Request) {
    return this.webhookAgentService.sendTelegramMessage(req.body);
  }
}
