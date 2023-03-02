import { Injectable } from '@nestjs/common';
import { Event } from '../../../frontend/src/generated/graphql';
import { Connpass, ConnpassEventResponse } from './connpass.model';
import { ConnpassRepository } from './connpass.repository';

@Injectable()
export class ConnpassService {
  constructor(private connpass: ConnpassRepository) {}
  // step1. event -> connpass event

  async toConnpass(data: Event): Promise<Connpass> {
    const result: Connpass = {
      eventId: data.id,
      keyword: data.userId,
      keywordOr: data.categoryId,
      ym: data.name,
      ymd: data.location,
      nickname: data.detail,
      ownerNickname: data.begin,
      seriesId: data.end,
      start: data.isTemporary,
      order: data.lastUpdate,
      count: data.createdDate,
    };
    return result;
  }
  /**
   *
   * step2. connpass event -> event
   * @param data
   * @returns
   */
  async toEvent(data: ConnpassEventResponse[]): Promise<Event[]> {
    const result: Event[] = data.map(
      (datum) =>
        ({
          id: datum.eventId,
          userId: datum.ownerId,
          categoryId: 'tech',
          name: datum.title,
          location: datum.place,
          detail: datum.description,
          begin: datum.startedAt,
          end: datum.endedAt,
          isTemporary: 0,
          lastUpdate: new Date(datum.updatedAt),
          createdDate: '',
        } as Event),
    );

    return result;
  }
}
