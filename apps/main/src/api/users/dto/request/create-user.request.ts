import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from 'class-validator';
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
    enum: Gender
  })
  @MaxLength(100)
  @MinLength(5)
  @IsEnum(Gender)
  readonly gender: Gender;
}

