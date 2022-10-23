import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import {
  CategoryEntity,
  FavoritesEntity,
  LinkEntity,
  NotesEntity,
} from './entities';
import { FavoritesModule } from './favorites/favorites.module';
import { LinkModule } from './links/link.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    CategoriesModule,
    LinkModule,
    NotesModule,
    FavoritesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      entities: [CategoryEntity, LinkEntity, NotesEntity, FavoritesEntity],
    }),
  ],
})
export class AppModule {}
