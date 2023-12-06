import { AggregateID } from '@app/common/ddd/base';
import { IdResponse } from '@app/common/ddd/dto/id.response.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest } from '../../dto/request/create-user.request';
import { CreateUserCommand } from './create-user.command';

@UseGuards()
@ApiTags('Users')
@Controller('users')
export class CreateUserHttpController {
  constructor(private readonly cBus: CommandBus) {}

  @ApiOperation({
    summary: 'Create a user',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Post()
  async create(@Body() request: CreateUserRequest): Promise<IdResponse> {
    const command = await new CreateUserCommand(request, );
    const result: AggregateID = await this.cBus.execute(command);
    return new IdResponse(result);
  }
}
