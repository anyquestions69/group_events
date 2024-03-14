import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma:PrismaService){
  }
  async create(groupId:number, dto: CreateEventDto) {
    let group = await this.prisma.group.findFirst({where:{id:groupId}, include:{contacts:true}})
    console.log(group.contacts)

    return this.prisma.event.create({data:{
      groupId:group.id,
      name:dto.name,
      description:dto.description,
      timeStart:new Date(dto.description),
      timeEnd:new Date(dto.timeEnd)
    }});
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
