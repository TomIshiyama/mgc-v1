import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DecoderItem {
  code: string;
  name?: string;
  @Field(() => Int)
  id?: number;
}

@ObjectType()
export class Decoder {
  @Field(() => [DecoderItem])
  category: DecoderItem[];
  @Field(() => [DecoderItem])
  divisionCode: DecoderItem[];
}
