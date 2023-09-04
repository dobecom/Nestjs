import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRequest } from './create-user.request';

export class UpdateUserRequest extends PartialType(CreateUserRequest) {}
