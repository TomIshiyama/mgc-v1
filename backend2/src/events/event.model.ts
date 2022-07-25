import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

@ObjectType()
@InputType('EventInput')
export class Event {
  @Field(() => Int)
  userId: number;
  @Field(() => Int)
  id: number;
  categoryId?: number;
  name: string;
  location?: string;
  detail?: string;
  begin: Date;
  end: Date;
  isTemporary: boolean;
  lastUpdate: Date;
  createdDate: Date;
}

@ObjectType()
@InputType()
export class EventUpsert extends PartialType(Event, InputType) {}

@ObjectType()
export class EventUpsertResponse extends PickType(Event, ['id']) {}

@ObjectType()
export class AttendEventList {
  @Field(() => Int)
  userId: number;
  @Field(() => [Event])
  eventList: Event[];
}
