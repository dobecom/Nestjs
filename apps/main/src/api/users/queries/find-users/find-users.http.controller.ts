import { ResponseBase } from '@app/common/api/response.base';
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindUsersRequest } from '../../dto/request/find-users.request';
import { UserPaginatedResponse } from '../../dto/response/user-paginated.response';
import { UserResponse } from '../../dto/response/user.response';
import { FindUsersQuery } from './find-users.query-handler';


@UseGuards()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly qBus: QueryBus) {}

  @ApiOperation({
    summary: 'Find all users',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UserResponse,
  })
  @Get()
  findAll() {
    // return this.usersService.findAllUsers();
  }

  @ApiOperation({
    summary: 'Find users',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UserResponse,
  })
  @Get('find')
  async findUsers(
    @Query() req: FindUsersRequest
  ): Promise<UserPaginatedResponse> {
    const query = new FindUsersQuery({
      ...req,
      limit: req.limit,
      page: req.page,
    })
    const result = await this.qBus.execute(query);

    // Whitelisting returned properties
    return new UserPaginatedResponse({
      ...result,
      data: result.data.map((user) => ({
        ...new ResponseBase(user),
        email: user.email,
        name: user.name,
      })),
    });
  }
}
