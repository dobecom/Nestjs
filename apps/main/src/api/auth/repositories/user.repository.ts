import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  registerUser(user: any) {
    return this.prisma.user.create({
      data: user,
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        records: true,
      },
    });
  }
}
