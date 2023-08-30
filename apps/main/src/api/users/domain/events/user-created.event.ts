import { DomainEvent, DomainEventProps } from '@app/common/ddd';

export class UserCreatedEvent extends DomainEvent {
  readonly name: string;
  readonly email: string;

  constructor(props: DomainEventProps<UserCreatedEvent>) {
    super(props);
    this.name = props.name;
    this.email = props.email;
  }
}
