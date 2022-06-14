import { Injectable } from '@nestjs/common';
import * as humps from 'humps';
import { PrismaService } from 'src/prisma.service';
import { User, UserGroupByDivision } from './user.model';

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

  async findManyroupBy(): Promise<User[][]> {
    const data = await this.prisma.users.findMany({});

    const result = data.reduce((acc, curr) => {
      const { division } = curr;
      return {
        ...acc,
        [division]: [
          ...(acc[division] || []),
          humps.camelizeKeys(curr) as User,
        ],
      };
    }, {} as UserGroupByDivision);
    return Object.values(result);
  }
}
