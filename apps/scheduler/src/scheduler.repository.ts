import { PrismaService } from '@app/common/db/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SchedulerRepository {
  constructor(private readonly prisma: PrismaService) {}
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
