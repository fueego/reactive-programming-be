import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { LinkModule } from './links/link.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [CategoriesModule, LinkModule, NotesModule],
})
export class AppModule {}
