import { Field, ID, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { ChangePasswordStatusDef, ThemeDef } from 'src/utils/const';
import { PositionDef } from '../utils/const';

@ObjectType('UserKey')
@InputType('UserKeyInput')
export class UserKey {
  @Field(() => ID)
  id: number;
}
@ObjectType()
@InputType('UserInput')
export class User extends UserKey {
  givenName: string;
  familyName: string;
  givenKana?: string;
  familyKana?: string;
  email: string;
  password: string;
  division: string;
  @Field(() => PositionDef)
  position: typeof PositionDef[keyof typeof PositionDef];
  iconPath?: string;
  iconName?: string;
  description?: string;
  @Field(() => ThemeDef)
  theme: typeof ThemeDef[keyof typeof ThemeDef];
  isAdmin: boolean;
  isStop: boolean;
  lastUpdate: Date;
  attendees?: string;
  events?: string;
}

@ObjectType()
export class UserUpsertResponse {
  @Field(() => ID)
  id: number;
  email: string;
  password: string;
}

/** ユーザー入力用モデル */
@ObjectType()
@InputType()
export class UserUpsert extends PartialType(User, InputType) {}

@ObjectType()
export class UserGroupByDivision {
  [key: string]: User[];
}

@ObjectType()
@InputType()
export class UserLoginInput {
  email: string;
  password: string;
}

@ObjectType()
export class UserLoginResponse {
  name?: string;
  userId: number;
  email: string;
  isAdmin: boolean;
}

@ObjectType()
@InputType()
export class ChangePasswordInput {
  email: string;
  currentPassword: string;
  newPassword: string;
}

@ObjectType()
export class ChangePasswordResponse {
  @Field(() => ID)
  userId: number;
  @Field(() => ChangePasswordStatusDef)
  status: keyof typeof ChangePasswordStatusDef;
}
