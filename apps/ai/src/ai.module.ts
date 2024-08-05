import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { HttpModule } from '@app/common/ext-http/http.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, EventsModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
