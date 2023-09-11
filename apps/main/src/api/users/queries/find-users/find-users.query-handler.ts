import {
  PaginatedParams,
  PaginatedQueryBase,
} from '@app/common/ddd/query.base';
import { Paginated } from '@app/common/ddd/repository.port';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';

export class FindUsersQuery extends PaginatedQueryBase {
  readonly type?: string;

  readonly gender?: string;

  constructor(props: PaginatedParams<FindUsersQuery>) {
    super(props);
    this.type = props.type;
    this.gender = props.gender;
  }
}

@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler {
  constructor(private readonly userRepo: UserRepository) {}

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(query: FindUsersQuery): Promise<Paginated<User>> {
    const res = await this.userRepo.findUsers(query);
    return res;
  }
}
