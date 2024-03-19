import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma:PrismaService){}
  create(user: CreateUserDto) {
    return this.prisma.user.create({data:user});
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(email: string) {
    return this.prisma.user.findFirst({where:{email}});
  }

}
