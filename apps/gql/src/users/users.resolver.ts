import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { NewUserInput } from './dto/new-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserOutput } from './dto/user.output';
import { PaginationInput } from './types/users.type';

@Resolver()
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Query(() => UserOutput, { nullable: true })
  user(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { type: () => String, nullable: true }) name?: string
  ): Promise<UserOutput | null> {
    return this.service.getUser(id, name);
  }

  @Query(() => [UserOutput])
  users(@Args() paginationInput: PaginationInput): Promise<UserOutput[]> {
    return this.service.getUsers(paginationInput);
  }

  @Mutation(() => Boolean)
  addUser(
    @Args('newUserData', { type: () => NewUserInput }) newUserData: NewUserInput
  ): Promise<boolean> {
    return this.service.addUser(newUserData);
  }

  @Mutation(() => Boolean)
  updateUser(
    @Args('updateUserData', { type: () => UpdateUserInput })
    updateUserData: UpdateUserInput
  ): Promise<boolean> {
    return this.service.updateUser(updateUserData);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.service.deleteUser(id);
  }
}
