import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
