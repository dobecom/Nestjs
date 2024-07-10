import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebhookAgentService {
  constructor(private readonly config: ConfigService) {}
  async sendTelegramMessage(params: any) {
    const url = `https://api.telegram.org/bot${this.config.get(
      'TELEGRAM_API_TOKEN'
    )}/sendMessage`;
    const data = {
      // public channel name (@channel_name) or chat id (123456789)
      chat_id: this.config.get('TELEGRAM_CHANNEL_NAME'),
      text: 'This is a test message from WebBotics.!',
    };
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return result;
  }
}
