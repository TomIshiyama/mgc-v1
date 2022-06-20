import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Event } from './event.model';
import { EventRepository } from './event.repository';
@Resolver()
export class EventResolver {
  constructor(private eventRepository: EventRepository) {}

  @Query(() => [Event])
  async getEventAll(): Promise<Event[]> {
    const data = this.eventRepository.findAll();
    return data;
  }

  @Query(() => Event)
  async getEvent(
    @Args('eventId', { type: () => Int }) id: number,
  ): Promise<Event> {
    const data = this.eventRepository.findUnique(id);
    return data;
  }
}
