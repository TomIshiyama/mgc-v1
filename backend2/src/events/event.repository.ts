import { Injectable } from '@nestjs/common';
import humps from 'humps';
import { PrismaService } from '../prisma.service';
import { AttendEventList, Event } from './event.model';

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<Event[]> {
    const data = await this.prisma.events.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return data.map((datum) => humps.camelizeKeys(datum) as Event);
  }

  async findUnique(id: number): Promise<Event> {
    const data = await this.prisma.events.findUnique({
      where: { id: id },
    });

    return humps.camelizeKeys(data) as Event;
  }

  async getEventListByUserId(userId: number): Promise<AttendEventList> {
    const data = await this.prisma.attendees.findMany({
      where: {
        user_id: userId,
      },
      include: {
        events: true,
      },
    });

    return {
      userId: userId,
      eventList: data.map((datum) => ({
        userId: datum.events.user_id,
        id: datum.events.id,
        categoryId: datum.events.category_id,
        name: datum.events.name,
        location: datum.events.location,
        detail: datum.events.detail,
        begin: datum.events.begin,
        end: datum.events.end,
        isTemporary: Boolean(datum.events.is_temporary),
        lastUpdate: datum.events.last_update,
        createdDate: datum.events.created_date,
      })),
    };
  }
}
