import { Controller } from '@nestjs/common';

@Controller()
export class GatewayController {
  constructor(
    // @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka, // Kafka
    // @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientKafka
  ) {}

  // Common Controller
}
