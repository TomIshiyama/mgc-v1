import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DecoderItem {
  code: string;
  name?: string;
}

@ObjectType()
export class Decoder {
  @Field(() => [DecoderItem])
  category: DecoderItem[];
  @Field(() => [DecoderItem])
  divisionCode: DecoderItem[];
}
