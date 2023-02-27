import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ConnpassRepository } from './connpass.repository';
import { ConnpassResolver } from './connpass.resolver';

@Module({
  providers: [PrismaService, ConnpassRepository, ConnpassResolver],
})
export class ConnpassModule {}
