import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports:[MailerModule.forRoot({
    transport: {
      host: process.env.SMTP_SERVER,
      port:+process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    }
  })],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
