import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesEntity, LinkEntity } from 'src/entities';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(LinkEntity) private repoLink: Repository<LinkEntity>,
    @InjectRepository(FavoritesEntity)
    private repoFavorites: Repository<FavoritesEntity>,
  ) {}

  async getAllFavorites(): Promise<FavoritesEntity[]> {
    return await this.repoFavorites.find({
      relations: ['link'],
    });
  }

  async addToFavorites(linkId: string): Promise<FavoritesEntity> {
    const linkRef = await this.repoLink.findOne({
      where: {
        linkId,
      },
    });

    if (!linkRef) {
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }

    const createFavorite = this.repoFavorites.create({
      link: linkRef,
    });

    return this.repoFavorites.save(createFavorite);
  }

  async removeFavorites(favoriteId: string): Promise<DeleteResult> {
    const result = await this.repoFavorites.delete({ favoriteId });

    if (result.affected < 1) {
      throw new HttpException('Not present in favorites', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
