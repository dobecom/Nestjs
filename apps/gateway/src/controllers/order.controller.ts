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
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../auth/auth.decorator';
import { AuthPipe } from '../auth/auth.pipe';
import { MessageSender } from '@app/common/utils/message.sender';
import { OrderMessage } from '@app/common/providers/messages/order.message';
import { AuthUserGuard } from '../auth/auth.user.guard';
import { ClsService } from 'nestjs-cls';

@ApiBearerAuth()
@UseGuards(AuthUserGuard)
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    @Inject('ORDER_SERVICE') private orderCp: ClientProxy,
    private readonly sender: MessageSender,
    private cls: ClsService
  ) {}

  @CreateOrderDecorator()
  @HttpCode(200)
  @Post()
  async createOrder(
    @AuthUser(AuthPipe) user: any,
    @Body() req: CreateOrderRequest
  ) {
    return await this.sender.send(this.orderCp, OrderMessage.ORDER_CREATE, {
      orders: req.orders,
      user,
    });
  }
}
