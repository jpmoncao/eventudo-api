import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}`)
      .get(this.user.getUsers)
      .post(ValidationMiddleware(CreateUserDto), this.user.createUser);

    this.router.route(`${this.path}/:id([0-9a-fA-F-]{36})`)
      .get(this.user.getUserById)
      .put(ValidationMiddleware(CreateUserDto, true), this.user.updateUser)
      .delete(this.user.deleteUser);
  }
}
