import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Attendee,
  AttendeeKey,
  // AttendeeUpsert,
  AttendeeUserList,
  AttendEventList,
} from './Attendee.model';
import { AttendeeRepository } from './attendee.repository';

@Resolver()
export class AttendeeResolver {
  constructor(private attendeeRepository: AttendeeRepository) {}

  @Query(() => Attendee)
  async getAttendee(
    @Args('params', { type: () => AttendeeKey }) params: AttendeeKey,
  ): Promise<Attendee | string> {
    const data = await this.attendeeRepository.findUnique(params);
    return data;
  }

  @Query(() => AttendEventList)
  async getAttendeeEventListByUserId(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<AttendEventList> {
    const data = await this.attendeeRepository.getEventListByUserId(userId);
    return data;
  }

  @Query(() => AttendeeUserList)
  async getAttendeeUserListByEventId(
    @Args('eventId', { type: () => Int }) eventId: number,
  ): Promise<AttendeeUserList> {
    const data = await this.attendeeRepository.findManyAttendeeByEvent(eventId);
    return data;
  }

  @Mutation(() => AttendeeKey)
  async upsertAttendee(
    @Args('params', { type: () => AttendeeKey }) params: AttendeeKey,
  ): Promise<AttendeeKey> {
    const data = await this.attendeeRepository.upsert(params);
    return data;
  }

  @Mutation(() => AttendeeKey)
  async deleteAttendee(
    @Args('params', { type: () => AttendeeKey })
    params: AttendeeKey,
  ): Promise<AttendeeKey> {
    const data = await this.attendeeRepository.delete(params);
    return data;
  }
}
