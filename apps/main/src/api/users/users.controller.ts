import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest } from './dto/request/create-user.request';
import { GetUserResponse } from './dto/response/get-user.response';
import { UsersService } from './users.service';

@UseGuards()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Get users',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: GetUserResponse,
  })
  @Get()
  findAll() {
    // console.log(req.headers.cookie)
    return this.usersService.findAllUsers();
  }

  @Post()
  async create(@Body() request: CreateUserRequest) {
    const result = await this.usersService.create(request);
  }
}
