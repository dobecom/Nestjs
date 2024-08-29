import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { NewUserInput } from './dto/new-user.input';
import { User } from './models/user.model';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersArgs } from './dto/users.args';

@Resolver()
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Query(() => User, { nullable: true })
  async user(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { type: () => String, nullable: true }) name?: string
  ): Promise<User | null> {
    const result = this.service.getUserByIdOrName(id, name);
    return result;
  }

  @Query(() => [User])
  users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.service.getUsers(usersArgs);
  }

  @Mutation(() => User)
  async addUser(
    @Args('newUserData', { type: () => NewUserInput }) newUserData: NewUserInput
  ): Promise<User> {
    const user = await this.service.addUser(newUserData);
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserData', { type: () => UpdateUserInput })
    updateUserData: UpdateUserInput
  ): Promise<User> {
    const user = await this.service.updateUser(updateUserData);
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    return this.service.deleteUser(id);
  }
}
