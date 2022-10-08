import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CategoryDto } from './categories.dto';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from '../entities/category.entity';
import { DeleteResult } from 'typeorm';

@Controller('category')
export class CategoriesController {
  constructor(private catSrvc: CategoriesService) {}

  @Get()
  async getAll(): Promise<CategoryEntity[]> {
    return await this.catSrvc.getAll();
  }

  @Get(':id')
  async getSingleCategory(@Param('id') id: string): Promise<CategoryEntity> {
    if (!id) {
      throw new NotFoundException('Category "id" not found');
    }

    const category = await this.catSrvc.getSingleCat(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  @Post()
  async create(@Body() newCategory: CategoryDto): Promise<CategoryEntity> {
    const newCat = await this.catSrvc.create(newCategory);
    return newCat;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.catSrvc.delete(id);
  }
}
