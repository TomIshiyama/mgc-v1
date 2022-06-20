import { Injectable } from '@nestjs/common';
import humps from 'humps';
import { PrismaService } from '../prisma.service';
import { Event } from './event.resolver';

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

    return humps.camelizeKeys(data);
  }
}
