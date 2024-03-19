import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { SchedulerModule } from 'src/scheduler/scheduler.module';

@Module({
  imports:[PrismaModule,  SchedulerModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
