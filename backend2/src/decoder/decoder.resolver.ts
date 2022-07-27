import { Query, Resolver } from '@nestjs/graphql';
import { Decoder } from './decoder.model';
import {
  DecoderCategoryRepository,
  DecoderDivisionCodeRepository,
} from './decoder.repository';

@Resolver()
export class DecoderResolver {
  constructor(
    private decoderCategoryRepository: DecoderCategoryRepository,
    private decoderDivisionCodeRepository: DecoderDivisionCodeRepository,
  ) {}

  @Query(() => Decoder)
  async decoder(): Promise<Decoder> {
    const [category, divisionCode] = await Promise.all([
      this.decoderCategoryRepository.findMany(),
      this.decoderDivisionCodeRepository.findMany(),
    ]);

    return { category, divisionCode };
  }
}
