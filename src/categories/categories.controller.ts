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
import { CategoriesService, Category } from './categories.service';
import { LinkService } from 'src/links/link.service';
import { NotesService } from 'src/notes/notes.service';

@Controller('category')
export class CategoriesController {
  constructor(
    private catSrvc: CategoriesService,
    private linkSrvc: LinkService,
    private noteSrvc: NotesService,
  ) {}

  @Get()
  getAll(): Category[] {
    return this.catSrvc.getAll();
  }

  @Get(':id')
  getSingleCategory(@Param('id') id: string): Category {
    if (!id) {
      throw new NotFoundException('Category "id" not found');
    }

    const category = this.catSrvc.getSingleCat(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  @Post()
  create(@Body() newCategory: CategoryDto): Category {
    const newCat = this.catSrvc.create(newCategory);
    return newCat;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): void {
    const resultBoolean = this.catSrvc.delete(id);
    resultBoolean && this.linkSrvc.deleteLinksByCategory(id);
    this.noteSrvc.removeNoteByCategoryId(id);

    if (!resultBoolean) {
      throw new NotFoundException('Category not found');
    }
  }
}
