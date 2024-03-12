import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { GroupModule } from './group/group.module';
import { EventModule } from './event/event.module';
import { ContactLanguageModule } from './contact.language/contact.language.module';
import { TagModule } from './tag/tag.module';
import { ImgModule } from './img/img.module';

@Module({
  imports: [ContactModule, GroupModule, EventModule, ContactLanguageModule, TagModule, ImgModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
