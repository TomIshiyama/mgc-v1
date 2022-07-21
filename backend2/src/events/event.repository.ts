import { Injectable } from '@nestjs/common';
import * as humps from 'humps';
import { PrismaService } from '../prisma.service';
import { AttendEventList, Event, EventUpsert } from './event.model';

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

  /**  仮登録、本登録で兼用で使う */
  async upsertEvent(params: EventUpsert) {
    const columnMapping = {
      user_id: params.userId,
      name: params.name,
      begin: params.begin,
      end: params.end,
      location: params.location,
      detail: params.detail,
      is_temporary: Number(params.isTemporary), // 0 or 1が来る想定
      category_id: params.categoryId,
      last_update: new Date(),
    };

    const data = await this.prisma.events.upsert({
      where: {
        id: params.id,
      },
      update: columnMapping,
      create: {
        ...columnMapping,
        created_date: new Date(),
      },
    });

    return { id: data.id };
  }
}
