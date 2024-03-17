import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports:[PrismaModule, ScheduleModule.forRoot()],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
