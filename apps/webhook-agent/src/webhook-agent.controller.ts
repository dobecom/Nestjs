import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { WebhookAgentService } from './webhook-agent.service';
import { AlertRequest, toAlertRequest } from './interface/AlertRequest';

@Controller()
export class WebhookAgentController {
  constructor(private readonly webhookAgentService: WebhookAgentService) {}

  @Get()
  getHello() {
    return 'Hello World';
  }

  // CPU Alert
  @Post('cpu-alert')
  @HttpCode(202)
  sendCpuAlert(@Req() req: Request) {
    const request: AlertRequest = toAlertRequest(req);
    this.webhookAgentService.sendCpuAlert(request);
    return HttpStatus.ACCEPTED;
  }

  // Memory Alert
  @Post('memory-alert')
  @HttpCode(202)
  sendMemoryAlert(@Req() req: Request) {
    const request: AlertRequest = toAlertRequest(req);
    this.webhookAgentService.sendMemoryAlert(request);
    return HttpStatus.ACCEPTED;
  }

  // Instance Alert
  @Post('instance-alert')
  @HttpCode(202)
  sendInstanceAlert(@Req() req: Request) {
    const request: AlertRequest = toAlertRequest(req);
    this.webhookAgentService.sendInstanceAlert(request);
    return HttpStatus.ACCEPTED;
  }
}
