import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInRequest {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  password: string;
}

export class SignInResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWUiLCJpZCI6MywiaWF0IjoxNzEyODIxNTI5LCJleHAiOjE3MTI5MDc5Mjl9.vOsMZzcEf_FGrhRHXbCOZtJq_r5AHu3t4wHWRf0f5dE',
  })
  @IsString()
  accessToken: string;
}
