import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private userCp: ClientProxy) {}

}

