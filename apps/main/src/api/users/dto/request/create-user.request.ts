import { Passports } from '@app/common/constants/passport.constant';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from '../../domain/user.types';

export class CreateUserRequest {
  @ApiProperty({
    example: 'steve',
    description: 'User name',
  })
  @MaxLength(100)
  @MinLength(5)
  @IsString()
  @Matches(/^[a-zA-Z가-힣]*$/)
  readonly name: string;

  @ApiProperty({
    example: 'steve@gmail.com',
    description: 'User email address',
  })
  @MaxLength(100)
  @MinLength(5)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'M',
    description: 'User gender (M or F)',
    enum: Gender,
  })
  @IsEnum(Gender)
  readonly gender: Gender;

  @ApiProperty({
    example: 'password',
    description: 'User password',
  })
  @MaxLength(20)
  @MinLength(8)
  @IsString()
  readonly hash: string;

  @ApiProperty({
    example: '20',
    description: 'User age',
  })
  @IsNumber()
  readonly age: number;

  @ApiProperty({
    example: '010-1234-5678',
    description: 'User phone number',
  })
  @MaxLength(20)
  @IsString()
  readonly phone: string;

  @ApiProperty({
    example: 'email',
    description: 'User type (email, google, facebook, twitter, apple)',
    enum: Passports
  })
  @IsEnum(Passports)
  readonly type: Passports;
}
