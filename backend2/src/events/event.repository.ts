import { Injectable } from '@nestjs/common';
import * as humps from 'humps';
import { PrismaService } from '../prisma.service';
import { Event, EventUpsert } from './event.model';

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

  async findMany(params?: Partial<Event>): Promise<Event[]> {
    const data = await this.prisma.events.findMany({
      where: {
        user_id: params?.userId,
        name: { contains: params?.name },
        location: { contains: params?.location },
        detail: { contains: params?.detail },
        is_temporary:
          params?.isTemporary != null ? Number(params.isTemporary) : undefined, // 0 or 1が来る想定
        category_id: params?.categoryId,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return data.map((datum) => humps.camelizeKeys(datum) as Event);
  }

  private columnMap(params: EventUpsert) {
    return {
      user_id: params.userId,
      name: params.name,
      begin: new Date(params.begin),
      end: new Date(params.end),
      location: params.location,
      detail: params.detail,
      is_temporary: Number(params.isTemporary), // 0 or 1が来る想定
      category_id: params.categoryId,
      last_update: new Date(),
    };
  }
  /**  仮登録、本登録で兼用で使う */
  async upsertEvent(params: EventUpsert) {
    const columnMapping = this.columnMap(params);
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

  async createEvent(params: EventUpsert) {
    const columnMapping = this.columnMap(params);
    const data = await this.prisma.events.create({
      data: {
        ...columnMapping,
        created_date: new Date(),
      },
    });
    return { id: data.id };
  }
}
