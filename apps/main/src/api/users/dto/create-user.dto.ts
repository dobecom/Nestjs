import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequest {
  @ApiProperty({
    example: 'steve',
    description: 'User name',
  })
  @MaxLength(100)
  @MinLength(5)
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'steve@gmail.com',
    description: 'User email address',
  })
  @MaxLength(100)
  @MinLength(5)
  @IsEmail()
  readonly email: string;
}
