import { registerEnumType } from '@nestjs/graphql';

export const ChangePasswordStatusDef = {
  ng: 'ng',
  ok: 'ok',
} as const;

export const ThemeDef = {
  normal: 'normal',
  dark: 'dark',
} as const;

export const PositionDef = {
  division: 'Division Director',
  unit: 'Unit Director',
  gd: 'Group Director',
  member: 'Member',
} as const;

registerEnumType(ChangePasswordStatusDef, {
  name: 'ChangePasswordStatusDef',
});

registerEnumType(ThemeDef, {
  name: 'ThemeDef',
});

registerEnumType(PositionDef, {
  name: 'PositionDef',
});
