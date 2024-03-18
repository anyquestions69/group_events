import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports:[PrismaModule, ScheduleModule.forRoot(), MailModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
