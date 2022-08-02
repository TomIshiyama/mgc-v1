import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ChangePasswordInput,
  ChangePasswordResponse,
  User,
  UserKey,
  UserLoginInput,
  UserLoginResponse,
  UserUpsert,
  UserUpsertResponse,
} from './user.model';
import { UserRepository } from './user.repository';

@Resolver()
export class UserResolver {
  constructor(private userRepository: UserRepository) {}

  @Query(() => User)
  async getUser(
    @Args('id', { type: () => Int! }) id: number,
  ): Promise<User | string> {
    const data = await this.userRepository.findUnique(id);
    return data;
  }

  @Query(() => [[User]])
  async getUserListGroup(): Promise<User[][]> {
    const data = await this.userRepository.findManyroupBy();
    return data;
  }

  @Mutation(() => UserUpsertResponse)
  async updateUser(
    @Args('params', { type: () => UserUpsert }) params: UserUpsert,
  ): Promise<UserUpsertResponse> {
    const data = await this.userRepository.update(params);
    return data;
  }

  @Mutation(() => UserKey)
  async createUser(
    @Args('params', { type: () => UserUpsert }) params: UserUpsert,
  ): Promise<UserKey> {
    const data = await this.userRepository.create(params);
    return data;
  }

  @Mutation(() => UserKey)
  async deleteUser(
    @Args('id', { type: () => Int! }) id: number,
  ): Promise<UserKey> {
    const data = await this.userRepository.delete(id);
    return data;
  }

  @Mutation(() => UserLoginResponse)
  async login(
    @Args('params', { type: () => UserLoginInput }) params: UserLoginInput,
  ): Promise<UserLoginResponse> {
    const data = await this.userRepository.login(params);
    return data;
  }

  @Mutation(() => ChangePasswordResponse)
  async changePassword(
    @Args('params', { type: () => ChangePasswordInput })
    params: ChangePasswordInput,
  ): Promise<ChangePasswordResponse> {
    const data = await this.userRepository.changePassword(params);
    return data;
  }
}
