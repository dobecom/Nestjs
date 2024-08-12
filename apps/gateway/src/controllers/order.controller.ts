import { CreateOrderRequest } from '@app/common/open-api/order/create-order.dto';
import { CreateOrderDecorator } from '@app/common/open-api/swagger.decorator';
import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { lastValueFrom, timeout } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/auth.decorator';
import { AuthPipe } from '../auth/auth.pipe';

@UseGuards(AuthGuard)
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    @Inject('ORDER_SERVICE') private orderCp: ClientProxy,
    private readonly config: ConfigService
  ) {}

  @CreateOrderDecorator()
  @HttpCode(200)
  @Post()
  async createOrder(
    @AuthUser(AuthPipe) user: any,
    @Body('orders') orders: CreateOrderRequest
  ) {
    return await lastValueFrom(
      this.orderCp
        .send('order-create', {
          orders,
          user,
        })
        .pipe(timeout(this.config.get('APPS_TIMEOUT')))
    );
  }
}
