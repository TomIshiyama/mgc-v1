import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  DecoderCategoryRepository,
  DecoderDivisionCodeRepository,
} from './decoder.repository';
import { DecoderResolver } from './decoder.resolver';

@Module({
  providers: [
    PrismaService,
    DecoderCategoryRepository,
    DecoderDivisionCodeRepository,
    DecoderResolver,
  ],
})
export class DecoderModule {}
