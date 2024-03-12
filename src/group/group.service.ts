import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { DeleteContacts } from './dto/delete-contact.dto';

@Injectable()
export class GroupService {
  constructor(private prisma:PrismaService){
  }
  create(dto:CreateGroupDto) {
   
    return this.prisma.group.create({data:{
      name:dto.name, 
      contacts:{
        connect:dto.contacts
      },
      tags:{
       connect:dto.tags
      }
    }});
  }

  findAll() {
    return this.prisma.group.findMany({  include: {
      _count: {
        select: { contacts: true },
      },
      events:true,
      contacts:true,
      tags:true
    },});
  }

  findOne(id: number) {
    return this.prisma.group.findUnique({where:{id}, 
      include:{
      contacts:{
        orderBy:{
          lastname:'asc',
        }
      }
      ,events:true,
      tags:true
    }});
  }

  update(id: number, updateGroupDto: Group) {
    return this.prisma.group.update({where:{id},data:updateGroupDto});
  }

  deleteContacts(id:number, dto:DeleteContacts){
    return this.prisma.group.update({
      where:{id},
      data:{
        contacts:{
          disconnect:dto.users
        }
      }
    })
  }

  remove(id: number) {
    return this.prisma.group.delete({where:{id}});
  }
}
