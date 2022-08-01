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

<<<<<<< HEAD
  @Query(() => AttendEventList)
  async getEventListByUserId(
    @Args('userId', { type: () => Int }) id: number,
  ): Promise<AttendEventList> {
    const data = await this.eventRepository.getEventListByUserId(id);
=======
  @Query(() => [Event])
  async getEventList(
    @Args('params', { type: () => EventUpsert, nullable: true })
    params?: Partial<Event>,
  ): Promise<Event[]> {
    const data = await this.eventRepository.findMany(params);
>>>>>>> 62c4225e09859934f51ba86e2e599a1c8f8438e2
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
}
