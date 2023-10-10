import { Module } from '@nestjs/common';
import { MsaFindbookController } from './msa-findbook.controller';
import { MsaFindbookService } from './msa-findbook.service';

@Module({
  imports: [],
  controllers: [MsaFindbookController],
  providers: [MsaFindbookService],
})
export class MsaFindbookModule {}
