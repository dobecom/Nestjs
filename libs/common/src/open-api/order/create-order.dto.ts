import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderRequestType {
  @ApiProperty({
    example: 'test-order',
  })
  @IsString()
  name: string;

  // @ApiProperty({
  //   example: 1,
  // })
  // @IsNumber()
  // userId: number;
}

export class CreateOrderResponseType {
  @ApiProperty({
    example: 1,
  })
  @IsString()
  id: string;
}

export class CreateOrderRequest {
  @ApiProperty({
    type: CreateOrderRequestType,
  })
  @ValidateNested()
  @Type(() => CreateOrderRequestType)
  orders: CreateOrderRequestType;
}

export class CreateOrderResponse {
  @ApiProperty({
    type: CreateOrderResponseType,
  })
  @ValidateNested()
  @Type(() => CreateOrderResponseType)
  orders: CreateOrderResponseType;
}
