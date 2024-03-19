import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Timeout, SchedulerRegistry, Cron } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { time } from 'console';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private schedulerRegistry: SchedulerRegistry) {}
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
  
  
async addCronJob(name: string,  email:string, date:Date) {
  let seconds = date.getSeconds()
  let minutes = date.getMinutes()
  let hours = date.getHours()
  let day = date.getDay()
  let month = date.getMonth()
  let year = date.getFullYear()
  let cronName=name+email+date.getTime()
  const job = new CronJob(`${seconds} ${minutes} ${hours} ${day} ${month} *`, async () => {
     await this.mailerService.sendMail({
      to: email,
      from:process.env.SMTP_EMAIL,
      subject: name,
      html:`
        Новое уведомление
      `
    });
    await this.schedulerRegistry.deleteCronJob(cronName);
    const jobs1 = this.schedulerRegistry.getCronJobs();
    console.log(jobs1)
  });
  
  this.schedulerRegistry.addCronJob(cronName, job);
  job.start();
  const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDate().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      console.log(`job: ${key} -> next: ${next}`);
    })
  
}





}
