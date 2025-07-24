import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
// import { HttpException } from '@/exceptions/httpException';
import { Category } from '@interfaces/categories.interface';

@Service()
export class CategoryService {
    public category = new PrismaClient().category;

    public async findAllCategories(): Promise<Category[]> {
        const allCategories: Category[] = await this.category.findMany();
        return allCategories;
    }

    public async findCategoryById(categoryId: number): Promise<Category> {
        const category: Category = await this.category.findFirst({
            where: { id: categoryId },
        });
        return category;
    }
}