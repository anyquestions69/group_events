import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class SchedulerService {
    constructor( private schedulerRegistry: SchedulerRegistry, private mailService: MailService) {}
    async addCronJob(name: string, description:string, email:string, date:Date) {
  
        let seconds = date.getSeconds()
        let minutes = date.getMinutes()
        let hours = date.getHours()-3
        let day = date.getDate()
        let month = date.getMonth()+1
        let cronName=name+email+date.getTime()
        const job = new CronJob(`${seconds} ${minutes} ${hours} ${day} ${month} *`, ()=>{this.notify(cronName, 'email', description, name,email)});
        
        this.schedulerRegistry.addCronJob(cronName, job);
        job.start();
        
         
        
      }
     notify(cronName:string, type:string, description:string, eventName:string, email:string){
        if(type=='email'){
            this.mailService.sendNotification(email, eventName, description)
        }else if(type=='tg'){
             console.log('tg message')
        }else{
             console.warn('None of available types was selected')
        }
        this.schedulerRegistry.deleteCronJob(cronName);
    }
}
