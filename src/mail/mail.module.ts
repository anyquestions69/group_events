import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[MailerModule.forRoot({
    // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
    // or
    transport: {
      host: 'smtp.example.com',
      secure: false,
      auth: {
        user: 'user@example.com',
        pass: 'topsecret',
      },
    },
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    },
  }),],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
