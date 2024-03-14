import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';


@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  create(@UploadedFile() file: Express.Multer.File, @Body() dto:CreateContactDto ) {
    return this.contactService.create(dto, file);
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }
  @Get('tag/:tag')
  findByTag(@Param('tag') tag:string){
    return this.contactService.findByTag(tag);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto:Contact) {
    return this.contactService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
