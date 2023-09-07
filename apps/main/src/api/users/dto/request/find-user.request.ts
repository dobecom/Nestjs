import { PaginatedQueryRequest } from '@app/common/api/paginated-query.request';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum Gender {
  M = 'M',
  F = 'F',
}

export class FindUserRequest extends PaginatedQueryRequest {
  @ApiProperty({
    example: 'google',
    description: 'Login type',
    required: false,
  })
  @MaxLength(30)
  @MinLength(5)
  @IsString()
  @IsOptional()
  @Matches(/^[a-zA-Z]*$/)
  readonly type: string;

  @ApiProperty({
    example: 'M',
    description: 'User gender (M or F)',
    required: false,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
}
