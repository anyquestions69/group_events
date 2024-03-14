import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AddUser } from './dto/add-user.dto';
import { Event } from '@prisma/client';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('group/:id')
  create(@Param('id')id:string, @Body() createEventDto: CreateEventDto) {
    return this.eventService.create(+id,createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }
  @Put(':id/add')
  addContact(@Param('id')id: string, @Body() dto:AddUser){
    return this.eventService.addContacts(+id, dto)
  }
  @Delete(':id/delete')
  deleteContacts(@Param('id') id:string, @Body() dto:AddUser){
    return this.eventService.deleteContacts(+id, dto)
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: Event) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
