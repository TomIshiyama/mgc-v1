import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export const ChangePasswordStatusDef = {
  ng: 'ng',
  ok: 'ok',
} as const;

registerEnumType(ChangePasswordStatusDef, {
  name: 'ChangePasswordStatusDef',
});

@ObjectType()
// @InputType()
export class UserKey {
  @Field(() => ID)
  id: number;
}
@ObjectType()
@InputType('UserInput')
export class User extends UserKey {
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
  isAdmin: boolean;
  isStop: boolean;
  lastUpdate: string;
  attendees?: string;
  events?: string;
}

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
