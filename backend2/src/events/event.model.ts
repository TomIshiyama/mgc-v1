import { InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('EventInput')
export class Event {
  userId: string;
  id: string;
  categoryId: number;
  name: string;
  location: string;
  detail: string;
  begin: Date;
  end: Date;
  isTemporary: boolean;
  lastUpdate: Date;
  createdDate: Date;
}
