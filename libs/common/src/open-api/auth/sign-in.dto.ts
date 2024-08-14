import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class SignInRequestType {
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

export class SignInRequest {
  @ApiProperty({
    type: SignInRequestType,
  })
  @ValidateNested()
  @Type(() => SignInRequestType)
  users: SignInRequestType;
}

export class SignInResponseType {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWUiLCJpZCI6MywiaWF0IjoxNzEyODIxNTI5LCJleHAiOjE3MTI5MDc5Mjl9.vOsMZzcEf_FGrhRHXbCOZtJq_r5AHu3t4wHWRf0f5dE',
  })
  @IsString()
  accessToken: string;
}

export class SignInResponse {
  @ApiProperty({
    type: SignInResponseType,
  })
  @ValidateNested()
  @Type(() => SignInResponseType)
  users: SignInResponseType;
}
