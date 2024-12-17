import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { HttpModule } from '@app/common/ext-http/http.module';
import { EventsModule } from './events/events.module';
import { DatabaseModule } from '@app/database';
import { PuppeteerService } from './puppeteer/puppeteer.service';
import { PuppeteerRepository } from './puppeteer/puppeteer.repository';
import { PuppeteerController } from './puppeteer/puppeteer.controller';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(), HttpModule, EventsModule],
  controllers: [AiController, PuppeteerController],
  providers: [AiService, PuppeteerService, PuppeteerRepository],
})
export class AiModule {}
