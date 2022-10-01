import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CategoryDto } from './categories.dto';

export interface Category
  extends Pick<CategoryDto, 'name' | 'description' | 'color'> {
  categoryId: string;
}

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];

  getAll(): Category[] {
    return this.categories;
  }

  getSingleCat(id: string): Category {
    const category = this.categories.find((cat) => cat.categoryId === id);
    return category;
  }

  create(body: CategoryDto): Category {
    const categoryId = uuid();
    const newCategory = { categoryId, ...body };
    this.categories.push(newCategory);

    return newCategory;
  }

  delete(id: string): boolean {
    const categoryToDelete = this.getSingleCat(id);

    if (!!categoryToDelete) {
      this.categories = this.categories.filter((cat) => cat.categoryId !== id);
      return true;
    }

    return false;
  }
}
