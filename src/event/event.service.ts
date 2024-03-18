import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { AddUser } from './dto/add-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Event } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class EventService {
  constructor(private prisma:PrismaService, private mail:MailService){
  }
  async create(groupId:number, dto: CreateEventDto) {
    let group = await this.prisma.group.findFirst({where:{id:groupId}, include:{contacts:true}})
    let contacts=[]
    for(let i of group.contacts){
      contacts.push({id:i.id})
    }
    this.mail.addCronJob(dto.name,'juuzodes@yandex.ru',new Date(dto.timeStart))
    return this.prisma.event.create({data:{
      groupId:group.id,
      name:dto.name,
      description:dto.description,
      timeStart:new Date(dto.timeStart),
      timeEnd:new Date(dto.timeEnd),
      contacts:{
        connect:contacts
      }
    },include:{contacts:true}});
  }

  findAll() {
    return this.prisma.event.findMany({include:{contacts:true}});
  }

  findOne(id: number) {
    return this.prisma.event.findFirst({where:{id},include:{contacts:true}});
  }
  addContacts(id:number, dto:AddUser){
    return this.prisma.event.update({where:{id},data:{
      contacts:{
        connect:dto.contacts
      }
    }, include:{contacts:true}},
    )
  }
  deleteContacts(id:number, dto:AddUser){
    return this.prisma.event.update({
      where:{id},
      data:{
        contacts:{
          disconnect:dto.contacts
        }
      }
      , include:{contacts:true}
    })
  }
  update(id: number, dto:Event) {
    return this.prisma.event.update({where:{id}, data:dto});
  }

  remove(id: number) {
    return this.prisma.event.delete({where:{id}});
  }
}
