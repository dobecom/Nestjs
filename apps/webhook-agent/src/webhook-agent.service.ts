import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AlertRequest } from './interface/AlertRequest';
import { JandiConnectInfo, JandiMessage } from './interface/JandiMessage';

@Injectable()
export class WebhookAgentService {
  constructor(private readonly config: ConfigService) {}

  private async convertDateTimeToKST(isoString: string) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private async sendTelegramMessage(req: AlertRequest) {
    const url = `https://api.telegram.org/bot${this.config.get(
      'TELEGRAM_API_TOKEN'
    )}/sendMessage`;
    const data = {
      // public channel name (@channel_name) or chat id (123456789)
      chat_id: this.config.get('TELEGRAM_CHANNEL_NAME'),
      text: `[${req.severity.toUpperCase()}] ${
        req.description
      } ${await this.convertDateTimeToKST(req.alerts[0].startsAt)}`,
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

  private async sendJandiMessage(req: AlertRequest) {
    const url = `https://wh.jandi.com/connect-api/webhook/${this.config.get(
      'JANDI_TOPIC_PATH'
    )}`;

    const data = {
      body: `🚨 [${req.severity.toUpperCase()}] ${req.label} 🚨`,
      connectColor: `#FAC11B`,
      connectInfo: [
        {
          title: `[${req.severity.toUpperCase()}] ${req.label}`,
          description:
            req.description +
            (await this.convertDateTimeToKST(req.alerts[0].startsAt)),
        } as JandiConnectInfo,
      ],
    } as JandiMessage;
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.tosslab.jandi-v2+json',
      },
      body: JSON.stringify(data),
    });
    return result;
  }

  async sendCpuAlert(req: AlertRequest) {
    this.sendJandiMessage(req);
    this.sendTelegramMessage(req);
  }

  async sendMemoryAlert(req: AlertRequest) {
    this.sendJandiMessage(req);
    this.sendTelegramMessage(req);
  }

  async sendInstanceAlert(req: AlertRequest) {
    this.sendJandiMessage(req);
    this.sendTelegramMessage(req);
  }
}
