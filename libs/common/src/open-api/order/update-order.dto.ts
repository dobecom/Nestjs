import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderRequestType {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'test-order',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  status?: number;
}

export class UpdateOrderResponseType {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  id: number;
}

export class UpdateOrderRequest {
  @ApiProperty({
    type: UpdateOrderRequestType,
  })
  @ValidateNested()
  @Type(() => UpdateOrderRequestType)
  orders: UpdateOrderRequestType;
}

export class UpdateOrderResponse {
  @ApiProperty({
    type: UpdateOrderResponseType,
  })
  @ValidateNested()
  @Type(() => UpdateOrderResponseType)
  orders: UpdateOrderResponseType;
}
