import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepo: UserRepository
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.userRepo.findUserByEmail(user.email);

    if (!userExists) {
      return this.userRepo.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });
    // return this.generateJwt({
    //   sub: 'id',
    //   email: 'email',
    // });
  }

  // async registerUser(user: RegisterUserDto) {
  //   try {
  //     const newUser = this.userRepository.create(user);
  //     newUser.username = generateFromEmail(user.email, 5);

  //     await this.userRepository.save(newUser);

  //     return this.generateJwt({
  //       sub: newUser.id,
  //       email: newUser.email,
  //     });
  //   } catch {
  //     throw new InternalServerErrorException();
  //   }
  // }

  // async findUserByEmail(email) {
  //   const user = await this.userRepository.findOne({ email });

  //   if (!user) {
  //     return null;
  //   }

  //   return user;
  // }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
