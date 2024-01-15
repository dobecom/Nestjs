import { AuthUser } from '@app/common/decorator/auth.decorator';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(@Inject('ORDER_SERVICE') private orderCp: ClientProxy) {}

  @Post()
  async createOrder(@AuthUser() user: any, @Body() req: any) {
    try {
      return await lastValueFrom(
        await this.orderCp.send('order-create', {
          ...req,
          userId: user.id,
        })
      );
    } catch (err) {
      throw err;
    }
  }
}
