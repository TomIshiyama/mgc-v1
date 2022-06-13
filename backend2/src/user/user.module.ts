import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';

@Module({
  providers: [PrismaService, UserResolver, UserRepository],
})
export class UserModule {}
