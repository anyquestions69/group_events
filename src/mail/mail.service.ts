import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Timeout, SchedulerRegistry, Cron } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { time } from 'console';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation(email:string) {
   try{
    return await this.mailerService.sendMail({
      to: email,
      from:process.env.SMTP_EMAIL,
      
      subject: 'Ваша ссылка на подключение бота с уведомлениями',
      html:`
        http://t.me/bot
      `
    });
   }catch(e){
    return e
   }
    
  }
  
  
async sendNotification(email:string, name:string, description:string){
  return await this.mailerService.sendMail({
    to: email,
    from:process.env.SMTP_EMAIL,
    subject: name,
    html:description
  });
}





}
