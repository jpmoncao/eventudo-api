import { NextFunction, Request, Response } from "express";
import Container from "typedi";

import { Event } from "@/interfaces/events.interface";
import { EventService } from "@/services/events.service";

export class EventController {
    public event = Container.get(EventService);

    public getEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllEventsData: Event[] = await this.event.findAllEvents();

            res.status(200).json({ data: findAllEventsData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const eventId = req.params.id ?? '';

            if (eventId.trim() === '')
                throw new Error('Falta parâmetros');

            const findEventByIdData: Event = await this.event.findEventById(eventId);

            res.status(200).json({ data: findEventByIdData, message: 'findEventById' });
        } catch (error) {
            next(error);
        }
    };

    public insertEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const eventData = req.body;

            const createEventData: Event = await this.event.createEvent(eventData);

            res.status(200).json({ data: createEventData, message: 'createEvent' });
        } catch (error) {
            next(error);
        }
    };
}