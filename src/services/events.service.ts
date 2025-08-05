import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { CreateEventDto } from '@dtos/events.dto';
// import { HttpException } from '@/exceptions/httpException';
import { Event } from '@interfaces/events.interface';

@Service()
export class EventService {
  public event = new PrismaClient().event;

  public async findAllEvents(): Promise<Event[]> {
    const allEvent: Event[] = await this.event.findMany({
      include: { eventimages: true },
      orderBy: { date: 'asc' },
      where: {
        date: {
          gte: new Date(),
        },
      },
    });
    return allEvent;
  }

  public async findEventById(eventId: string): Promise<Event> {
    const event: Event = await this.event.findFirst({
      include: { category: true, eventimages: true, eventpromotion: true },
      where: { id: eventId },
    });

    return event;
  }

  public async createEvent(eventData: CreateEventDto): Promise<Event> {
    const { id_category, ...rest } = eventData;

    const event = await this.event.create({
      data: {
        ...rest,
        date: new Date(eventData.date),
        category: {
          connect: { id: id_category },
        },
      },
    });

    return event;
  }

}