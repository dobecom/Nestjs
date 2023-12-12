import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AuthUser } from '../auth/decorators/auth.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(@Inject('ORDER_SERVICE') private orderCp: ClientProxy) {}

  @Post()
  createOrder(@AuthUser() user: any, @Body() req: any) {
    try {
      return lastValueFrom(
        this.orderCp.send('order-create', {
          ...req,
          userId: user.id,
        })
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
