import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LinkDto } from './link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity, LinkEntity } from 'src/entities';
import { DeleteResult, Repository } from 'typeorm';

export interface LinkData
  extends Pick<LinkEntity, 'linkId' | 'shortDescription' | 'url'> {
  categoryId: string;
}

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repoCat: Repository<CategoryEntity>,
    @InjectRepository(LinkEntity) private repoLink: Repository<LinkEntity>,
  ) {}

  async getAllLinks(): Promise<LinkData[]> {
    const results = await this.repoLink.find({
      relations: ['categoryEntity'],
    });

    return results.map(
      ({ linkId, shortDescription, url, categoryEntity: cat }) => ({
        linkId,
        shortDescription,
        url,
        categoryId: cat.categoryId,
      }),
    );
  }

  async getSingleLink(id: string): Promise<LinkEntity> {
    return this.repoLink.findOne({
      where: { linkId: id },
    });
  }

  async createLink(body: LinkDto): Promise<LinkEntity> {
    const relatedCategory = await this.repoCat.findOne({
      where: {
        categoryId: body.categoryId,
      },
    });

    const createLink = this.repoLink.create({
      categoryEntity: relatedCategory,
      shortDescription: body.shortDescription,
      url: body.url,
    });

    return this.repoLink.save(createLink);
  }

  async deleteLink(id: string): Promise<DeleteResult> {
    const result = await this.repoLink.delete({ linkId: id });

    if (result.affected < 1) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
