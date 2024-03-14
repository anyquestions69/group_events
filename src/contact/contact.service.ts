import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Group } from 'src/group/entities/group.entity';
import { Contact } from '@prisma/client';
import { Express } from 'express';


@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService){}
 
  create(dto:CreateContactDto, file) {
    
    return this.prisma.contact.create({data:{
      firstname:dto.firstname,
      image:file.filename,
      lastname:dto.lastname,
      birth:new Date(dto.birth),
      country:dto.country,
      city:dto.city,
      link:dto.link,
      tags: {connect:dto.tags}
        
      
    }, include:{tags:true}
    });
  }

  findAll() {
    return this.prisma.contact.findMany({include:{languages:true,tags:true,groups:true}}); 
  }
  findByTag(tag:string){
    return this.prisma.contact.findMany({
      include:{tags:{
        where:{name:tag}
      },
      groups:true,
      company:true
    }
    })
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
