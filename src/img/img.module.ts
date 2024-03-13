import { Module } from '@nestjs/common';
import { ImgService } from './img.service';
import { ImgController } from './img.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ImgController],
  providers: [ImgService],
})
export class ImgModule {}
