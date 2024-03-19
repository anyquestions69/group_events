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
  let hours = date.getHours()-3
  let day = date.getDay()
  console.log(day)
  let month = date.getMonth()+1
  let year = date.getFullYear()
  let cronName=name+email+date.getTime()
  const job = new CronJob(`${seconds} ${minutes} ${hours} ${day} ${month} *`,  () => {
      this.mailerService.sendMail({
      to: email,
      from:process.env.SMTP_EMAIL,
      subject: name,
      html:`
        Новое уведомление
      `
    });
    //await this.schedulerRegistry.deleteCronJob(cronName);
   
    console.log('done')
  });
  
  this.schedulerRegistry.addCronJob(cronName, job);
  job.start();
  const jobs = this.schedulerRegistry.getCronJobs();
  console.log(jobs)
   
  
}





}
