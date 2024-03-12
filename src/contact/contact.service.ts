import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Group } from 'src/group/entities/group.entity';
import { Contact } from '@prisma/client';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService){}
  create(dto:Contact) {
    return this.prisma.contact.create({data:{
      firstname:dto.firstname,
      lastname:dto.lastname,

      tags:{
          connect:dto.tags
        },
      
    }
    });
  }

  findAll() {
    return this.prisma.contact.findMany({include:{languages:true,tags:true,groups:true}}); 
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
