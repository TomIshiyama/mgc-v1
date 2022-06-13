import { Injectable } from '@nestjs/common';
import * as humps from 'humps';
import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findUnique(userId: number): Promise<User> {
    const data = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(data);
    console.log(humps.camelizeKeys(data));
    return humps.camelizeKeys(data) as User;
  }
}
