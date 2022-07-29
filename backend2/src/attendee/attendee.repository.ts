import { Injectable } from '@nestjs/common';
import * as humps from 'humps';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/user/user.model';
import {
  Attendee,
  AttendeeKey,
  AttendeeUserList,
  AttendEventList,
} from './attendee.model';

@Injectable()
export class AttendeeRepository {
  constructor(private prisma: PrismaService) {}

  async findUnique(params: AttendeeKey): Promise<Attendee> {
    const data = await this.prisma.attendees.findUnique({
      where: {
        user_id_event_id: {
          user_id: params.userId,
          event_id: params.eventId,
        },
      },
    });
    return humps.camelizeKeys(data) as Attendee;
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

  async findManyAttendeeByEvent(eventId: number): Promise<AttendeeUserList> {
    const data = await this.prisma.attendees.findMany({
      where: {
        event_id: eventId,
      },
      include: {
        users: true,
      },
    });

    return {
      eventId: eventId,
      userlist:
        data?.map((datum) => ({
          ...(humps.camelizeKeys(datum.users) as User),
        })) ?? [],
    };
  }

  /**
   * イベント参加ユーザ 登録・編集
   */
  async upsert(params: AttendeeKey): Promise<AttendeeKey> {
    const columnMapping = {
      user_id: params.userId,
      event_id: params.eventId,
    };

    const data = await this.prisma.attendees.upsert({
      where: {
        user_id_event_id: {
          user_id: params.userId,
          event_id: params.eventId,
        },
      },
      create: {
        ...columnMapping,
      },
      update: {
        ...columnMapping,
      },
    });

    return { userId: data.user_id, eventId: data.event_id };
  }

  async delete(params: AttendeeKey): Promise<AttendeeKey> {
    try {
      const data = await this.prisma.attendees.delete({
        select: { user_id: true, event_id: true },
        where: {
          user_id_event_id: {
            user_id: params.userId,
            event_id: params.eventId,
          },
        },
      });
      return { userId: data.user_id, eventId: data.event_id };
    } catch {
      throw new Error('削除失敗');
    }
  }
}
