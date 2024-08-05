import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { HttpModule } from '@app/common/ext-http/http.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  providers: [EventsGateway],
})
export class EventsModule {}
