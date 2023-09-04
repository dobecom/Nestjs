import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRequest } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserRequest) {}
