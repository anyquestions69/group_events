import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Group } from 'src/group/entities/group.entity';
import { Contact } from '@prisma/client';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService){}
  create(dto:CreateContactDto) {
    return this.prisma.contact.create({data:{
      firstname:dto.firstname,
      lastname:dto.lastname,
      birth:dto.birth,
      country:dto.country,
      city:dto.city,
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
