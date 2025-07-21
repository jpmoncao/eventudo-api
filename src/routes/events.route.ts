import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
// import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { EventController } from '@/controllers/events.controller';

export class EventRoute implements Routes {
  public path = '/events';
  public router = Router();
  public event = new EventController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.event.getEvents);
    this.router.get(`${this.path}/:id`, this.event.getEventById);
    this.router.post(`${this.path}/`, this.event.insertEvent);
  }
}
