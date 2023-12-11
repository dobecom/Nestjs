import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthUser } from '../auth/decorators/auth.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(@Inject('ORDER_SERVICE') private orderCp: ClientProxy) {}

  @Post()
  async createOrder(@AuthUser() user: any, @Body() req: any) {
    try {
      const result = await this.orderCp.send('order-create', {
        ...req,
        userId: user.id,
      });
      const data = await new Promise((resolve, reject) => {
        result.subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err);
          },
        });
      });
      return data;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
