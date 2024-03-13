import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { ImgService } from './img.service';
import { CreateImgDto } from './dto/create-img.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions, multerConfig } from 'src/config/multer.config';


@Controller('img')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @Post()
  create(@Body() createImgDto: CreateImgDto) {
    return this.imgService.create(createImgDto);
  }

  @Get()
  findAll() {
    return this.imgService.findAll();
  }
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
   
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imgService.findOne(+id);
  }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imgService.remove(+id);
  }
}

