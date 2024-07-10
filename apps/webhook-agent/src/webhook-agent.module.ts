import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebhookAgentController } from './webhook-agent.controller';
import { WebhookAgentService } from './webhook-agent.service';

@Module({
  imports: [],
  controllers: [WebhookAgentController],
  providers: [WebhookAgentService, ConfigService],
})
export class WebhookAgentModule {}
