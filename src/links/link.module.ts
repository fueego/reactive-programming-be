import { Module } from '@nestjs/common';
import { NotesModule } from 'src/notes/notes.module';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [NotesModule],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [LinkService],
})
export class LinkModule {}
