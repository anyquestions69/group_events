import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from '@prisma/client';
import { DeleteContacts } from './dto/delete-contact.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }
  @Patch(':id/deleteUsers')
  deleteContacts(@Param('id') id:string, @Body() dto:DeleteContacts){
    return this.groupService.deleteContacts(+id, dto)
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: Group) {
    return this.groupService.update(+id, updateGroupDto)
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
