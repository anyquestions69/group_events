import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from 'src/mail/mail.module';
import { SchedulerService } from './scheduler.service';

@Module({
    imports:[MailModule ,ScheduleModule.forRoot()],
    providers:[SchedulerService],
    exports:[SchedulerService]
})
export class SchedulerModule {}
