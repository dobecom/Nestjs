import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignUpRequest {
  @ApiProperty({
    example: 'test1@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  password: string;
}

export class SignUpResponse {
  @ApiProperty({
    example: 'test1@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  password: string;
}
