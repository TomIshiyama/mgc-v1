import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as humps from 'humps';
import {
  Connpass,
  ConnpassEventResponse,
  ConnpassRequestInput,
  ConnpassResponse,
} from './connpass.model';

// MEMO: axios の型定義を overwriteしようとした残骸
// declare module 'axios' {
// interface AxiosRequestConfig {

// }
// }

@Injectable()
export class ConnpassRepository {
  async findAll(): Promise<ConnpassEventResponse[]> {
    console.log(process.env.CONNPASS_API_ENDPOINT);
    if (!process.env.CONNPASS_API_ENDPOINT) {
      throw new Error('');
    }
    const { data } = await axios.get<ConnpassResponse>(
      process.env.CONNPASS_API_ENDPOINT,
    );
    return data.events.map(
      (datum) => humps.camelizeKeys(datum) as ConnpassEventResponse,
    );
  }

  async findUnique(id: number): Promise<ConnpassEventResponse> {
    const { data } = await axios.get<ConnpassResponse>(
      process.env.CONNPASS_API_ENDPOINT,
      { params: { event_id: id } as Partial<Connpass> },
    );

    if (!data.events.length) {
      throw new Error('');
    }

    console.log(humps.camelizeKeys(data.events[0]));
    debugger;
    return humps.camelizeKeys(data.events[0]) as ConnpassEventResponse;
  }

  async findMany(
    params?: ConnpassRequestInput,
  ): Promise<ConnpassEventResponse[]> {
    if (!process.env.CONNPASS_API_ENDPOINT) {
      throw new Error('');
    }
    // camelCase to snake_case
    const requestParams: Partial<Connpass> = humps.decamelizeKeys(params);

    const { data } = await axios.get<ConnpassResponse>(
      process.env.CONNPASS_API_ENDPOINT,
      { params: requestParams },
    );

    return data.events.map((datum) =>
      humps.camelizeKeys(datum),
    ) as ConnpassEventResponse[];
  }
}
