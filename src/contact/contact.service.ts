import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Contact } from '@prisma/client';
import { Express } from 'express';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService, private email:MailService){}
 
  create(dto:CreateContactDto, file) {
    try{
      let tags=[]
      for(let i of dto.tags){
        tags.push({id:+i})
      }
      this.email.sendUserConfirmation(dto.email)
      return this.prisma.contact.create({data:{
        firstname:dto.firstname,
        image:file.filename,
        lastname:dto.lastname,
        email:dto.email,
        birth:new Date(dto.birth),
        country:dto.country,
        city:dto.city,
        telegram:dto.telegram,
        tags: {connect:tags}
      }, include:{tags:true}
      });
    }catch(e){
      console.warn(e)
    }
    
  }

  findAll(name:string, tag:string,country:string, city:string, post:string) {
    const filters ={AND:[ ]}
    if(name){
      filters.AND.push({
        OR:[
          {firstname:{
            contains:name,
            mode: 'insensitive'
          }},
          {lastname:{
            contains:name,
            mode: 'insensitive'
          }}
        ]
      })
    }
    if(country){
      filters.AND.push({country:{contains:country,mode: 'insensitive'}})
    }
    if(city){
      filters.AND.push({city:{contains:city,mode: 'insensitive'}})
    }
    if(post){
      filters.AND.push({post:{contains:post,mode: 'insensitive'}})
    }
    return this.prisma.contact.findMany({where:filters,include:{languages:true,tags:true,groups:true}}); 
  }
  findByTag(tag:string){
    return this.prisma.tag.findFirst({
      where:{name:tag},
      include:{
      contacts:true
    }
    })
  }
  findByName(name:string){
    return this.prisma.contact.findMany({where:{
      OR:[
        {firstname:{
          contains:name,
          mode: 'insensitive'
        }},
        {lastname:{
          contains:name,
          mode: 'insensitive'
        }}
      ]
    }})
  }
  findOne(id: number) {
    return this.prisma.contact.findUnique({where:{id}});
  }

  update(id: number, dto:Contact) {
    return this.prisma.contact.update({where:{id},data:dto});
  }

  remove(id: number) {
    return this.prisma.contact.delete({where:{id}});
  }
}
