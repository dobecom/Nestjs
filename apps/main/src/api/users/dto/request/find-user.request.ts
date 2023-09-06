import { PaginatedQueryRequest } from '@app/common/api/paginated-query.request';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class FindUserRequest extends PaginatedQueryRequest {
  @ApiProperty({
    example: 'steve',
    description: 'User name',
  })
  @MaxLength(100)
  @MinLength(5)
  @IsString()
  @IsOptional()
  @Matches(/^[a-zA-Z0-9가-힣]*$/)
  readonly name: string;

  @ApiProperty({
    example: 'steve@gmail.com',
    description: 'User email address',
  })
  @MaxLength(100)
  @MinLength(5)
  @IsEmail()
  @IsOptional()
  @Matches(/^[a-zA-Z0-9@.]*$/)
  readonly email: string;
}
