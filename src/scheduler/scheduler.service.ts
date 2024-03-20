import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class SchedulerService {
    constructor( private schedulerRegistry: SchedulerRegistry, private mailService: MailService) {}
    async addCronJob(name: string, description:string, email:string, date:Date ,every:string, dateEnd:Date) {
       
        let seconds = date.getSeconds().toString()
        let minutes = date.getMinutes().toString()
        let hours = (date.getHours()-3).toString()
        let day = date.getDate().toString()
        let month = (date.getMonth()+1).toString()
        switch(every[every.length-1]){
            case "s":
                seconds+="/"+every.slice(0, -1)
                break;
            case "m":
                minutes+="/"+every.slice(0, -1)
                break;
            case "h":
                hours+="/"+every.slice(0, -1)
                break;
            case "d":
                day+="/"+every.slice(0, -1)
                break;
            case "M":
                month+="/"+every.slice(0, -1)
                break;
        }
        let cronName=name+email+date.getTime()
        const job = new CronJob(`${seconds} ${minutes} ${hours} ${day} ${month} *`, ()=>{
            this.notify('email', description, name,email);

        });
        const deleteJob = new CronJob(
            `${dateEnd.getSeconds()+1} ${dateEnd.getMinutes()} ${dateEnd.getHours()} ${dateEnd.getDate()} ${dateEnd.getMonth()} *`,
         ()=>{
            this.deleteNotification(cronName)
        })
        
        this.schedulerRegistry.addCronJob(cronName, job);
        job.start();
        this.schedulerRegistry.addCronJob(cronName+'delete', deleteJob);
        deleteJob.start();
         
        
      }
     notify( type:string, description:string, eventName:string, email:string){
        if(type=='email'){
            this.mailService.sendNotification(email, eventName, description)
        }else if(type=='tg'){
             console.log('tg message')
        }else{
             console.warn('None of available types was selected')
        }
       
    }
    deleteNotification(cronName:string){
        this.schedulerRegistry.deleteCronJob(cronName);
        this.schedulerRegistry.deleteCronJob(cronName+'delete');
    }
}
