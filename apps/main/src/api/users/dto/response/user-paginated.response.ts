import { PaginatedResponse } from '@app/common/api/paginated.response';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user.response';

export class UserPaginatedResponse extends PaginatedResponse<UserResponse> {
  @ApiProperty({ type: UserResponse, isArray: true })
  readonly data: readonly UserResponse[];
}
