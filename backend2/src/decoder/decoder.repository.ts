import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DecoderItem } from './decoder.model';

@Injectable()
export class DecoderCategoryRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(categoryCodeList?: string[]): Promise<DecoderItem[]> {
    const data = await this.prisma.categories.findMany({
      where: {
        category_code: {
          in: categoryCodeList,
        },
      },
    });
    // return humps.camelizeKeys(data) as DecoderItem;
    return data.map((datum) => ({
      code: datum.category_code,
      name: datum.name,
    }));
  }
}

@Injectable()
export class DecoderDivisionCodeRepository {
  constructor(private prisma: PrismaService) {}
  async findMany(): Promise<DecoderItem[]> {
    const data = await this.prisma.division_code_master.findMany();

    return data.map((datum) => ({
      code: datum.code,
    }));
  }
}
