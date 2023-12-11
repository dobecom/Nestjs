import { CommonModule } from '@app/common';
import { PAYMENT_SERVICE_PROXY } from '@app/common/proxy/services.proxy';
import { DbModule } from '@app/db';
import { OrderEntity } from '@app/db/entities/order.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [CommonModule, DbModule, TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [OrderService, PAYMENT_SERVICE_PROXY],
})
export class OrderModule {}
