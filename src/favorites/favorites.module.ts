import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity, LinkEntity } from 'src/entities';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritesEntity, LinkEntity])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
