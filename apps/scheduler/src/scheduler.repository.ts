import { Injectable } from '@nestjs/common';
import { PrismaService } from './db/prisma/prisma.service';

@Injectable()
export class SchedulerRepository {
  constructor(private readonly prisma: PrismaService) {}
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
