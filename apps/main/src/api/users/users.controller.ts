import { PaginatedQueryRequest } from '@app/common/api/paginated-query.request';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest } from './dto/request/create-user.request';
import { FindUserRequest } from './dto/request/find-user.request';
import { UserPaginatedResponse } from './dto/response/user-paginated.response';
import { UserResponse } from './dto/response/user.response';
import { UsersService } from './users.service';

@UseGuards()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    return this.usersService.findAllUsers();
  }

  @ApiOperation({
    summary: 'Find users',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UserResponse,
  })
  @Post('find')
  async findUsers(
    @Query() req: FindUserRequest
  ): Promise<UserPaginatedResponse> {
    const result = await this.usersService.findUsers(req);

    return null;
    // return this.usersService.findUsers(req, query);
  }

  @Post()
  async create(@Body() request: CreateUserRequest) {
    const result = await this.usersService.create(request);
  }
}
