import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AttendeeRepository } from './attendee.repository';
import { AttendeeResolver } from './attendee.resolver';

@Module({
  providers: [PrismaService, AttendeeResolver, AttendeeRepository],
})
export class AttendeeModule {}
