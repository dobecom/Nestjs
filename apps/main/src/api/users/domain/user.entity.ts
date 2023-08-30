import { AggregateID, AggregateRoot } from '@app/common/ddd';
import { CreateUserProps, UserProps, UserRoles } from './user.types';
import { v4 } from 'uuid';
import { UserCreatedEvent } from './events/user-created.event';

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: AggregateID;

  public validate(): void {
    throw new Error('Method not implemented.');
  }

  static create(create: CreateUserProps): UserEntity {
    const id = v4();
    const props: UserProps = { ...create, role: UserRoles.user };
    const user = new UserEntity({ id, props });
    user.addEvent(
      new UserCreatedEvent({
        aggregateId: id,
        name: props.name,
        email: props.email,
      })
    );
    return user;
  }
}
