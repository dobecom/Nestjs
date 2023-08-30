import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@UseGuards()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    // console.log(req.headers.cookie)
    return this.usersService.findAllUsers();
  }

  @Post()
  async create(@Body() request: CreateUserRequestDto) {
    const result = await this.usersService.create(request);
  }
}
