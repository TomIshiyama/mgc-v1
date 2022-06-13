import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserRepository } from './user.repository';

@Resolver()
export class UserResolver {
  constructor(private userRepository: UserRepository) {}

  @Query(() => User)
  async getUser(
    @Args('id', { type: () => Int! }) id: number,
  ): Promise<User | string> {
    const data = this.userRepository.findUnique(id);
    return data;
  }
}
