import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Timeout } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation(email:string) {
   
    await this.mailerService.sendMail({
      to: email,
      from:process.env.SMTP_EMAIL,
      
      subject: 'Ваша ссылка на подключение бота с уведомлениями',
      html:`
        http://t.me/bot
      `
    });
  }
  


  async sendNotification(email:string, name:string, date:Date){
    

    await this.mailerService.sendMail({
      to: email,
      from:'juuzo@rambler.ru',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: name,
      html:`
        Новое уведомление
      `
    });
  }
}
