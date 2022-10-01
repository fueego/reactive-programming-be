import { Module } from '@nestjs/common';
import { LinkModule } from 'src/links/link.module';
import { NotesModule } from 'src/notes/notes.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [LinkModule, NotesModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
