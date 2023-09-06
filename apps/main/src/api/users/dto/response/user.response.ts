import { ResponseBase } from '@app/common/api/response.base';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse extends ResponseBase {
  @ApiProperty({
    example: 'steve',
    description: "User name",
  })
  name: string;

  @ApiProperty({
    example: 'steve@gmail.com',
    description: "User's email address",
  })
  email: string;
}
