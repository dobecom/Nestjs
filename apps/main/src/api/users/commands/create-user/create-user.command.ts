import { Passports } from '@app/common/constants/passport.constant';
import { PrismaService } from '@app/common/db/prisma/prisma.service';
import { Command, CommandProps } from '@app/common/ddd';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from '../../domain/user.entity';
import { Gender } from '../../domain/user.types';
import { UserRepository } from '../../repositories/user.repository';
import { UserMapper } from '../../user.mapper';

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
    private readonly userRepo: UserRepository,
    private readonly prisma: PrismaService,
    private readonly mapper: UserMapper,
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

    const user2 = UserEntity.create({
      email: 'test@email.com',
      hash: 'test',
      name: '테스트',
      age: 15,
      phone: '010-1234-1234',
      gender: Gender.M,
      type: Passports.EMAIL,
    });

    try {
      // const res = await this.prisma.$transaction(async (tx) => {
      //   const insertUser = await this.userRepo.createUser(tx, user);
      //   const insertUser2 = await this.userRepo.createUser(tx, user2);
      //   return insertUser2;
      // })
      const res = await this.prisma.$transaction([
        await this.userRepo.createUser(user),
        await this.userRepo.createUser(user2),
      ])
      console.log('res', res);
      return res;
      // return user.id;
    } catch (err) {
      console.log('create user command error')
      throw err;
    }
  }
}
