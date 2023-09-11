import { PaginatedQueryRequest } from '@app/common/api/paginated-query.request';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Gender } from '../../domain/user.types';

export class FindUsersRequest extends PaginatedQueryRequest {
  @ApiProperty({
    example: 'google',
    description: 'Login type',
    required: false,
  })
  @MaxLength(30)
  @IsString()
  @IsOptional()
  @Matches(/^[a-zA-Z ]*$/)
  readonly type: string;

  @ApiProperty({
    example: 'M',
    description: 'User gender (M or F)',
    required: false,
    enum: Gender
  })
  @IsOptional()
  @IsEnum(Gender)
  readonly gender: Gender;
}
