import { BadRequestException, Injectable } from '@nestjs/common';
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
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });
  }

  async signIn(user) {
    try {
      if (!user) {
        throw new BadRequestException('Unauthenticated');
      }

      const userExists = await this.userRepo.findUserByEmail(user.email);

      if (!userExists) {
        this.userRepo.registerUser(user);
        return this.generateJwt({
          sub: user.providerId,
          email: user.email,
        });
      }
      return this.generateJwt({
        sub: userExists.id,
        email: userExists.email,
      });
    } catch (err) {
      console.log('err');
      console.log(err);
    }
  }

  async findUser(id: number) {
    return await this.userRepo.findOne(id);
  }

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
