import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryDto } from './categories.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity) private repo: Repository<CategoryEntity>,
  ) {}

  async getAll(): Promise<CategoryEntity[]> {
    return this.repo.find();
  }

  async getSingleCat(id: string): Promise<CategoryEntity> {
    return this.repo.findOne({
      where: {
        categoryId: id,
      },
    });
  }

  async create(body: CategoryDto): Promise<CategoryEntity> {
    const newCategory = this.repo.create({
      name: body.name,
      description: body.description,
      color: body.color,
    });
    return this.repo.save(newCategory);
  }

  async delete(id: string): Promise<DeleteResult> {
    const result = await this.repo.delete({ categoryId: id });

    if (result.affected < 1) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
