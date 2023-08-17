import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ContractRequest {
  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  value: number;
}
