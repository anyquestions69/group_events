import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Tag } from '@prisma/client';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService){}
  create(createTagDto: Tag) {
    return this.prisma.tag.create({data:createTagDto});
  }


  remove(id: number) {
    return this.prisma.tag.delete({where:{id}});
  }
}
