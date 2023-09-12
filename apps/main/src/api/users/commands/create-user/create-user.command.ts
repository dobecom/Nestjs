import { Passports } from '@app/common/constants/passport.constant';
import { Command, CommandProps } from '@app/common/ddd';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from '../../domain/user.entity';
import { Gender } from '../../domain/user.types';
import { UserRepository } from '../../repositories/user.repository';

export class CreateUserCommand extends Command {
  readonly email: string;
  readonly hash: string;
  readonly name: string;
  readonly age: number;
  readonly phone: string;
  readonly gender: Gender;
  readonly type?: Passports;

  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.email = props.email;
    this.hash = props.hash;
    this.name = props.name;
    this.age = props.age;
    this.phone = props.phone;
    this.gender = props.gender;
    this.type = props.type;
  }
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler {
  constructor(
    protected readonly userRepo: UserRepository
  ) {}
  async execute(command: CreateUserCommand) {
    const user = UserEntity.create({
      email: command.email,
      hash: command.hash,
      name: command.name,
      age: command.age,
      phone: command.phone,
      gender: command.gender,
      type: command.type,
    });

    try {
      await this.userRepo.transaction(async () => {
        return this.userRepo.createUser(user);
      });
      return user.id;
    } catch (err) {
      throw err;
    }
  }
}
