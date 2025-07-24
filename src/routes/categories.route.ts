import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
// import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CategoryController } from '@/controllers/categories.controller';

export class CategoryRoute implements Routes {
  public path = '/categories';
  public router = Router();
  public event = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.event.getCategories);
    this.router.get(`${this.path}/:id`, this.event.getCategoryById);
  }
}
