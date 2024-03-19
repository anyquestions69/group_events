import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { GroupModule } from './group/group.module';
import { EventModule } from './event/event.module';
import { TagModule } from './tag/tag.module';
import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler/scheduler.service';
import { SchedulerModule } from './scheduler/scheduler.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ContactModule, GroupModule, EventModule, TagModule, MailModule, ScheduleModule.forRoot(), SchedulerModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, SchedulerService],
})
export class AppModule {}
 