import { Controller, Get } from '@nestjs/common';
import { SagaService } from './saga.service';

@Controller()
export class SagaController {
  constructor(private readonly sagaService: SagaService) {}

  @Get()
  getHello(): string {
    return this.sagaService.getHello();
  }
}
