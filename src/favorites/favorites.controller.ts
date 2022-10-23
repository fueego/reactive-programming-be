import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesEntity } from 'src/entities/favorites.entity';
import { DeleteResult } from 'typeorm';
import { FavoritesDto } from './favorites.dto';
import { FavoritesService } from './favorites.service';

@Controller('favorite')
export class FavoritesController {
  constructor(private favoritesSrvc: FavoritesService) {}

  @Get()
  async getAllFavorites(): Promise<FavoritesEntity[]> {
    return await this.favoritesSrvc.getAllFavorites();
  }

  @Post()
  async addToFavorites(@Body() body: FavoritesDto): Promise<FavoritesEntity> {
    return await this.favoritesSrvc.addToFavorites(body.linkId);
  }

  @Delete(':id')
  async removeFromFavorites(@Param('id') id: string): Promise<DeleteResult> {
    return await this.favoritesSrvc.removeFavorites(id);
  }
}
