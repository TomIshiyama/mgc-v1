import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/events/event.model';
import { User } from 'src/user/user.model';

@ObjectType()
@InputType('AttendeeKeyInput')
export class AttendeeKey {
  @Field(() => Int)
  userId: number;
  @Field(() => Int)
  eventId: number;
}
@ObjectType()
@InputType('AttendeeInput')
export class Attendee extends AttendeeKey {
  lastUpdate: Date;
  createdDate: Date;
}

@ObjectType()
export class AttendeeUserList {
  @Field(() => Int)
  eventId: number;
  userlist: User[];
}

@ObjectType()
export class AttendEventList {
  @Field(() => Int)
  userId: number;
  @Field(() => [Event])
  eventList: Event[];
}
