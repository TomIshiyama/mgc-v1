import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;
  givenName: string;
  familyName: string;
  givenKana: string;
  familyKana: string;
  email: string;
  password: string;
  division: string;
  position: string;
  iconPath: string;
  iconName: string;
  description: string;
  theme: string;
  isAdmin: string;
  isStop: string;
  lastUpdate: string;
  attendees: string;
  events: string;
}
