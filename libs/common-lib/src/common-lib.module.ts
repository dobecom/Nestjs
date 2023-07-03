import { Module } from '@nestjs/common';
import { DateLibService } from './services/date-lib.service';

@Module({
  providers: [DateLibService],
  exports: [DateLibService],
})
export class CommonLibModule {}
