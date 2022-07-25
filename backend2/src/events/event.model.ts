import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

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
export class AttendEventList {
  @Field(() => Int)
  userId: number;
  @Field(() => [Event])
  eventList: Event[];
}
