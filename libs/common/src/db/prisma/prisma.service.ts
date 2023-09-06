import { EnvService } from '@app/common/env/env.service';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(envService: EnvService) {
    super({
      datasources: {
        db: {
          url: envService.get('DATABASE_URL'),
        },
      },
    });
  }
}
