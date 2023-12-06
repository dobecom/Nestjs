import { RepositoryPort } from '@app/common/ddd/base/repository.port';
import { UserEntity } from '../domain/user.entity';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  // findOneByEmail(email: string): Promise<UserEntity | null>;
}
