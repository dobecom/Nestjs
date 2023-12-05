import { PaginatedQueryRequest } from '@app/common/ddd/dto/paginated-query.request';
import { Passports } from '@app/common/presentations/enums/passport.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Gender } from '../../domain/user.types';

export class FindUsersRequest extends PaginatedQueryRequest {
  @ApiProperty({
    example: 'google',
    description: 'Login type [google, facebook, twitter, apple, email]',
    required: false,
    enum: Passports,
  })
  @IsEnum(Passports)
  @IsOptional()
  readonly type: Passports;

  @ApiProperty({
    example: 'M',
    description: 'User gender (M or F)',
    required: false,
    enum: Gender,
  })
  @IsOptional()
  @IsEnum(Gender)
  readonly gender: Gender;
}
