import { NextFunction, Request, Response } from "express";
import Container from "typedi";

import { Category } from "@/interfaces/categories.interface";
import { CategoryService } from "@/services/categories.service";

export class CategoryController {
    public category = Container.get(CategoryService);

    public getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllCategoriesData: Category[] = await this.category.findAllCategories();

            res.status(200).json({ data: findAllCategoriesData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const categoryId = req.params.id;

            if (categoryId.trim() === '')
                throw new Error('Falta parâmetros');

            if (isNaN(Number(categoryId)))
                throw new Error('Parâmetro inválido');

            const findCategoryByIdData: Category = await this.category.findCategoryById(Number(categoryId));

            res.status(200).json({ data: findCategoryByIdData, message: 'findCategoryById' });
        } catch (error) {
            next(error);
        }
    };
}