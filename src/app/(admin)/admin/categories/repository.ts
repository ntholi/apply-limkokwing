import { FirebaseRepository } from '../../admin-core/repository';
import { ResourceCreate } from '../../admin-core/repository/repository';
import { Category } from './category';

class CategoryRepository extends FirebaseRepository<Category> {
  constructor() {
    super('categories');
  }

  async create(category: ResourceCreate<Category>): Promise<Category> {
    category.name = category.name.trim().toLowerCase();
    return await super.create(category);
  }

  async update(id: string, category: Category): Promise<Category> {
    category.name = category.name.trim().toLowerCase();
    return await super.update(id, category);
  }
}

export const categoryRepository = new CategoryRepository();
