import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ConnpassEventResponse, ConnpassRequestInput } from './connpass.model';
import { ConnpassRepository } from './connpass.repository';
@Resolver()
export class ConnpassResolver {
  constructor(private connpassRepository: ConnpassRepository) {}

  @Query(() => [ConnpassEventResponse])
  async getConnpassAll(): Promise<ConnpassEventResponse[]> {
    const data = await this.connpassRepository.findAll();
    return data;
  }

  @Query(() => ConnpassEventResponse)
  async getConnpass(
    @Args('connpassId', { type: () => Int }) id: number,
  ): Promise<ConnpassEventResponse> {
    const data = await this.connpassRepository.findUnique(id);
    return data;
  }

  @Query(() => [ConnpassEventResponse])
  async getConnpassList(
    @Args('params', { type: () => ConnpassRequestInput, nullable: true })
    params?: Partial<ConnpassRequestInput>,
  ): Promise<ConnpassEventResponse[]> {
    const data = await this.connpassRepository.findMany(params);
    return data;
  }
}

// 本アプリで定義しているevent_id と
