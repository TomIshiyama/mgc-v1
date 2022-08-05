import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Event, EventUpsert, EventUpsertResponse } from './event.model';
import { EventRepository } from './event.repository';
@Resolver()
export class EventResolver {
  constructor(private eventRepository: EventRepository) {}

  @Query(() => [Event])
  async getEventAll(): Promise<Event[]> {
    const data = await this.eventRepository.findAll();
    return data;
  }

  @Query(() => Event)
  async getEvent(
    @Args('eventId', { type: () => Int }) id: number,
  ): Promise<Event> {
    const data = await this.eventRepository.findUnique(id);
    return data;
  }

  @Query(() => [Event])
  async getEventList(
    @Args('params', { type: () => EventUpsert, nullable: true })
    params?: Partial<Event>,
  ): Promise<Event[]> {
    const data = await this.eventRepository.findMany(params);
    return data;
  }

  @Mutation(() => EventUpsertResponse)
  async upsertEvent(
    @Args('params', { type: () => EventUpsert }) params: EventUpsert,
  ): Promise<EventUpsertResponse> {
    const data = await this.eventRepository.upsertEvent(params);
    return data;
  }

  @Mutation(() => EventUpsertResponse)
  async createEvent(
    @Args('params', { type: () => EventUpsert }) params: EventUpsert,
  ): Promise<EventUpsertResponse> {
    const data = await this.eventRepository.createEvent(params);
    return data;
  }

  @Mutation(() => EventUpsertResponse)
  async deleteEvent(
    @Args('eventId', { type: () => Int }) eventId: number,
  ): Promise<EventUpsertResponse> {
    const data = await this.eventRepository.deleteEvent(eventId);
    return data;
  }
}
