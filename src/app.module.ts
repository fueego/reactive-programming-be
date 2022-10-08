import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { CategoryEntity, LinkEntity, NotesEntity } from './entities';
import { LinkModule } from './links/link.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    CategoriesModule,
    LinkModule,
    NotesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      entities: [CategoryEntity, LinkEntity, NotesEntity],
    }),
  ],
})
export class AppModule {}
