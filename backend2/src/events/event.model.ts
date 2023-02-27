import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';

@ObjectType()
@InputType('EventInput')
export class Event {
  @Field(() => Int)
  userId?: number; // イベント作成者ID
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

export type EventDistinctKey = typeof EventKeyMap[keyof typeof EventKeyMap];

export const EventKeyMap = {
  userId: 'user_id',
  id: 'id',
  categoryId: 'category_id',
  name: 'name',
  location: 'location',
  detail: 'detail',
  begin: 'begin',
  end: 'end',
  isTemporary: 'is_temporary',
  lastUpdate: 'last_update',
  createdDate: 'created_date',
} as const;

registerEnumType(EventKeyMap, {
  name: 'EventKeyMap',
});
