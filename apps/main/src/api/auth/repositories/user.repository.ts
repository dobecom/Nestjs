import { PrismaService } from '@app/common/db/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserRoles } from '../../users/domain/user.types';

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
      data: {
        email: user.email,
        type: 'google',
        hash: '',
        name: user.name,
        role: UserRoles.user
      },
    });
  }

  findOne(id: string) {
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
