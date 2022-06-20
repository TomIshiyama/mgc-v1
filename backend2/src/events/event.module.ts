import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EventRepository } from './event.repository';
import { EventResolver } from './event.resolver';

@Module({
  providers: [PrismaService, EventResolver, EventRepository],
})
export class EventModule {}
