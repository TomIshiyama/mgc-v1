import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AttendEventList = {
  __typename?: 'AttendEventList';
  eventList: Array<Event>;
  userId: Scalars['Int'];
};

export type Attendee = {
  __typename?: 'Attendee';
  createdDate: Scalars['DateTime'];
  eventId: Scalars['Int'];
  lastUpdate: Scalars['DateTime'];
  userId: Scalars['Int'];
};

export type AttendeeInput = {
  createdDate: Scalars['DateTime'];
  eventId: Scalars['Int'];
  lastUpdate: Scalars['DateTime'];
  userId: Scalars['Int'];
};

export type AttendeeKey = {
  __typename?: 'AttendeeKey';
  eventId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type AttendeeKeyInput = {
  eventId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type AttendeeUserList = {
  __typename?: 'AttendeeUserList';
  eventId: Scalars['Int'];
  userlist: Array<User>;
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String'];
  email: Scalars['String'];
  newPassword: Scalars['String'];
};

export type ChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  status: ChangePasswordStatusDef;
  userId: Scalars['ID'];
};

export enum ChangePasswordStatusDef {
  Ng = 'ng',
  Ok = 'ok'
}

export type Decoder = {
  __typename?: 'Decoder';
  category: Array<DecoderItem>;
  divisionCode: Array<DecoderItem>;
};

export type DecoderItem = {
  __typename?: 'DecoderItem';
  code: Scalars['String'];
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  begin: Scalars['DateTime'];
  categoryId?: Maybe<Scalars['Float']>;
  createdDate: Scalars['DateTime'];
  detail?: Maybe<Scalars['String']>;
  end: Scalars['DateTime'];
  id: Scalars['Int'];
  isTemporary: Scalars['Boolean'];
  lastUpdate: Scalars['DateTime'];
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  userId: Scalars['Int'];
};

export type EventInput = {
  begin: Scalars['DateTime'];
  categoryId?: InputMaybe<Scalars['Float']>;
  createdDate: Scalars['DateTime'];
  detail?: InputMaybe<Scalars['String']>;
  end: Scalars['DateTime'];
  id: Scalars['Int'];
  isTemporary: Scalars['Boolean'];
  lastUpdate: Scalars['DateTime'];
  location?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  userId: Scalars['Int'];
};

export type EventUpsert = {
  begin?: InputMaybe<Scalars['DateTime']>;
  categoryId?: InputMaybe<Scalars['Float']>;
  createdDate?: InputMaybe<Scalars['DateTime']>;
  detail?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  isTemporary?: InputMaybe<Scalars['Boolean']>;
  lastUpdate?: InputMaybe<Scalars['DateTime']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type EventUpsertResponse = {
  __typename?: 'EventUpsertResponse';
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ChangePasswordResponse;
  createEvent: EventUpsertResponse;
  createUser: UserKey;
  deleteAttendee: AttendeeKey;
  login: UserLoginResponse;
  upsertAttendee: AttendeeKey;
  upsertEvent: EventUpsertResponse;
  upsertUser: UserUpsertResponse;
};


export type MutationChangePasswordArgs = {
  params: ChangePasswordInput;
};


export type MutationCreateEventArgs = {
  params: EventUpsert;
};


export type MutationCreateUserArgs = {
  params: UserUpsert;
};


export type MutationDeleteAttendeeArgs = {
  params: AttendeeKeyInput;
};


export type MutationLoginArgs = {
  params: UserLoginInput;
};


export type MutationUpsertAttendeeArgs = {
  params: AttendeeKeyInput;
};


export type MutationUpsertEventArgs = {
  params: EventUpsert;
};


export type MutationUpsertUserArgs = {
  params: UserUpsert;
};

export enum PositionDef {
  Division = 'division',
  Gd = 'gd',
  Member = 'member',
  Unit = 'unit'
}

export type Query = {
  __typename?: 'Query';
  decoder: Decoder;
  getAttendee: Attendee;
  getAttendeeEventListByUserId: AttendEventList;
  getAttendeeUserListByEventId: AttendeeUserList;
  getEvent: Event;
  getEventAll: Array<Event>;
  getEventList: Array<Event>;
  getUser: User;
  getUserListGroup: Array<Array<User>>;
};


export type QueryGetAttendeeArgs = {
  params: AttendeeKeyInput;
};


export type QueryGetAttendeeEventListByUserIdArgs = {
  userId: Scalars['Int'];
};


export type QueryGetAttendeeUserListByEventIdArgs = {
  eventId: Scalars['Int'];
};


export type QueryGetEventArgs = {
  eventId: Scalars['Int'];
};


export type QueryGetEventListArgs = {
  params?: InputMaybe<EventUpsert>;
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export enum ThemeDef {
  Dark = 'dark',
  Normal = 'normal'
}

export type User = {
  __typename?: 'User';
  attendees?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  division: Scalars['String'];
  email: Scalars['String'];
  events?: Maybe<Scalars['String']>;
  familyKana?: Maybe<Scalars['String']>;
  familyName: Scalars['String'];
  givenKana?: Maybe<Scalars['String']>;
  givenName: Scalars['String'];
  iconName?: Maybe<Scalars['String']>;
  iconPath?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  isStop: Scalars['Boolean'];
  lastUpdate: Scalars['DateTime'];
  password: Scalars['String'];
  position: PositionDef;
  theme: ThemeDef;
};

export type UserInput = {
  attendees?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  division: Scalars['String'];
  email: Scalars['String'];
  events?: InputMaybe<Scalars['String']>;
  familyKana?: InputMaybe<Scalars['String']>;
  familyName: Scalars['String'];
  givenKana?: InputMaybe<Scalars['String']>;
  givenName: Scalars['String'];
  iconName?: InputMaybe<Scalars['String']>;
  iconPath?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  isStop: Scalars['Boolean'];
  lastUpdate: Scalars['DateTime'];
  password: Scalars['String'];
  position: PositionDef;
  theme: ThemeDef;
};

export type UserKey = {
  __typename?: 'UserKey';
  id: Scalars['ID'];
};

export type UserKeyInput = {
  id: Scalars['ID'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginResponse = {
  __typename?: 'UserLoginResponse';
  email: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  userId: Scalars['Float'];
};

export type UserUpsert = {
  attendees?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  division?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  events?: InputMaybe<Scalars['String']>;
  familyKana?: InputMaybe<Scalars['String']>;
  familyName?: InputMaybe<Scalars['String']>;
  givenKana?: InputMaybe<Scalars['String']>;
  givenName?: InputMaybe<Scalars['String']>;
  iconName?: InputMaybe<Scalars['String']>;
  iconPath?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isStop?: InputMaybe<Scalars['Boolean']>;
  lastUpdate?: InputMaybe<Scalars['DateTime']>;
  password?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<PositionDef>;
  theme?: InputMaybe<ThemeDef>;
};

export type UserUpsertResponse = {
  __typename?: 'UserUpsertResponse';
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
};

export type GetAttendeeEventListByUserIdQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetAttendeeEventListByUserIdQuery = { __typename?: 'Query', getAttendeeEventListByUserId: { __typename?: 'AttendEventList', userId: number, eventList: Array<{ __typename?: 'Event', userId: number, id: number, categoryId?: number | null, name: string, location?: string | null, detail?: string | null, begin: any, end: any, isTemporary: boolean, lastUpdate: any, createdDate: any }> } };

export type GetAttendeeUserListByEventIdQueryVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type GetAttendeeUserListByEventIdQuery = { __typename?: 'Query', getAttendeeUserListByEventId: { __typename?: 'AttendeeUserList', eventId: number, userlist: Array<{ __typename?: 'User', givenName: string, familyName: string, givenKana?: string | null, familyKana?: string | null, email: string, password: string, division: string, position: PositionDef, iconPath?: string | null, iconName?: string | null, description?: string | null, theme: ThemeDef, isAdmin: boolean, isStop: boolean, lastUpdate: any, attendees?: string | null }> } };

export type UpsertAttendeeMutationVariables = Exact<{
  params: AttendeeKeyInput;
}>;


export type UpsertAttendeeMutation = { __typename?: 'Mutation', upsertAttendee: { __typename?: 'AttendeeKey', userId: number, eventId: number } };

export type DeleteAttendeeMutationVariables = Exact<{
  params: AttendeeKeyInput;
}>;


export type DeleteAttendeeMutation = { __typename?: 'Mutation', deleteAttendee: { __typename?: 'AttendeeKey', userId: number, eventId: number } };

export type DecoderQueryVariables = Exact<{ [key: string]: never; }>;


export type DecoderQuery = { __typename?: 'Query', decoder: { __typename?: 'Decoder', category: Array<{ __typename?: 'DecoderItem', code: string, name?: string | null, id?: number | null }>, divisionCode: Array<{ __typename?: 'DecoderItem', code: string }> } };

export type GetEventAllQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventAllQuery = { __typename?: 'Query', getEventAll: Array<{ __typename?: 'Event', userId: number, id: number, categoryId?: number | null, name: string, location?: string | null, detail?: string | null, begin: any, end: any, isTemporary: boolean, lastUpdate: any, createdDate: any }> };

export type GetEventQueryVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type GetEventQuery = { __typename?: 'Query', getEvent: { __typename?: 'Event', userId: number, id: number, categoryId?: number | null, name: string, location?: string | null, detail?: string | null, begin: any, end: any, isTemporary: boolean, lastUpdate: any, createdDate: any } };

export type GetEventListQueryVariables = Exact<{
  params?: InputMaybe<EventUpsert>;
}>;


export type GetEventListQuery = { __typename?: 'Query', getEventList: Array<{ __typename?: 'Event', userId: number, id: number, categoryId?: number | null, name: string, location?: string | null, detail?: string | null, begin: any, end: any, isTemporary: boolean, lastUpdate: any, createdDate: any }> };

export type UpsertEventMutationVariables = Exact<{
  params: EventUpsert;
}>;


export type UpsertEventMutation = { __typename?: 'Mutation', upsertEvent: { __typename?: 'EventUpsertResponse', id: number } };

export type CreateEventMutationVariables = Exact<{
  params: EventUpsert;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'EventUpsertResponse', id: number } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, isAdmin: boolean, givenName: string, familyName: string } };

export type GetUserListGroupQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserListGroupQuery = { __typename?: 'Query', getUserListGroup: Array<Array<{ __typename?: 'User', givenName: string, familyName: string, givenKana?: string | null, familyKana?: string | null, email: string, password: string, division: string, position: PositionDef, iconPath?: string | null, iconName?: string | null, description?: string | null, theme: ThemeDef, isAdmin: boolean, isStop: boolean, lastUpdate: any, attendees?: string | null }>> };

export type UpsertUserMutationVariables = Exact<{
  params: UserUpsert;
}>;


export type UpsertUserMutation = { __typename?: 'Mutation', upsertUser: { __typename?: 'UserUpsertResponse', id: string, email: string, password: string } };

export type CreateUserMutationVariables = Exact<{
  params: UserUpsert;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserKey', id: string } };

export type LoginMutationVariables = Exact<{
  params: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserLoginResponse', userId: number, email: string, isAdmin: boolean } };

export type ChangePasswordMutationVariables = Exact<{
  params: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordResponse', userId: string, status: ChangePasswordStatusDef } };


export const GetAttendeeEventListByUserIdDocument = gql`
    query GetAttendeeEventListByUserId($userId: Int!) {
  getAttendeeEventListByUserId(userId: $userId) {
    userId
    eventList {
      userId
      id
      categoryId
      name
      location
      detail
      begin
      end
      isTemporary
      lastUpdate
      createdDate
    }
  }
}
    `;

/**
 * __useGetAttendeeEventListByUserIdQuery__
 *
 * To run a query within a React component, call `useGetAttendeeEventListByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendeeEventListByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendeeEventListByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAttendeeEventListByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetAttendeeEventListByUserIdQuery, GetAttendeeEventListByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAttendeeEventListByUserIdQuery, GetAttendeeEventListByUserIdQueryVariables>(GetAttendeeEventListByUserIdDocument, options);
      }
export function useGetAttendeeEventListByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAttendeeEventListByUserIdQuery, GetAttendeeEventListByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAttendeeEventListByUserIdQuery, GetAttendeeEventListByUserIdQueryVariables>(GetAttendeeEventListByUserIdDocument, options);
        }
export type GetAttendeeEventListByUserIdQueryHookResult = ReturnType<typeof useGetAttendeeEventListByUserIdQuery>;
export type GetAttendeeEventListByUserIdLazyQueryHookResult = ReturnType<typeof useGetAttendeeEventListByUserIdLazyQuery>;
export type GetAttendeeEventListByUserIdQueryResult = Apollo.QueryResult<GetAttendeeEventListByUserIdQuery, GetAttendeeEventListByUserIdQueryVariables>;
export const GetAttendeeUserListByEventIdDocument = gql`
    query GetAttendeeUserListByEventId($eventId: Int!) {
  getAttendeeUserListByEventId(eventId: $eventId) {
    eventId
    userlist {
      givenName
      familyName
      givenKana
      familyKana
      email
      password
      division
      position
      iconPath
      iconName
      description
      theme
      isAdmin
      isStop
      lastUpdate
      attendees
    }
  }
}
    `;

/**
 * __useGetAttendeeUserListByEventIdQuery__
 *
 * To run a query within a React component, call `useGetAttendeeUserListByEventIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendeeUserListByEventIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendeeUserListByEventIdQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetAttendeeUserListByEventIdQuery(baseOptions: Apollo.QueryHookOptions<GetAttendeeUserListByEventIdQuery, GetAttendeeUserListByEventIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAttendeeUserListByEventIdQuery, GetAttendeeUserListByEventIdQueryVariables>(GetAttendeeUserListByEventIdDocument, options);
      }
export function useGetAttendeeUserListByEventIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAttendeeUserListByEventIdQuery, GetAttendeeUserListByEventIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAttendeeUserListByEventIdQuery, GetAttendeeUserListByEventIdQueryVariables>(GetAttendeeUserListByEventIdDocument, options);
        }
export type GetAttendeeUserListByEventIdQueryHookResult = ReturnType<typeof useGetAttendeeUserListByEventIdQuery>;
export type GetAttendeeUserListByEventIdLazyQueryHookResult = ReturnType<typeof useGetAttendeeUserListByEventIdLazyQuery>;
export type GetAttendeeUserListByEventIdQueryResult = Apollo.QueryResult<GetAttendeeUserListByEventIdQuery, GetAttendeeUserListByEventIdQueryVariables>;
export const UpsertAttendeeDocument = gql`
    mutation UpsertAttendee($params: AttendeeKeyInput!) {
  upsertAttendee(params: $params) {
    userId
    eventId
  }
}
    `;
export type UpsertAttendeeMutationFn = Apollo.MutationFunction<UpsertAttendeeMutation, UpsertAttendeeMutationVariables>;

/**
 * __useUpsertAttendeeMutation__
 *
 * To run a mutation, you first call `useUpsertAttendeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertAttendeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertAttendeeMutation, { data, loading, error }] = useUpsertAttendeeMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUpsertAttendeeMutation(baseOptions?: Apollo.MutationHookOptions<UpsertAttendeeMutation, UpsertAttendeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertAttendeeMutation, UpsertAttendeeMutationVariables>(UpsertAttendeeDocument, options);
      }
export type UpsertAttendeeMutationHookResult = ReturnType<typeof useUpsertAttendeeMutation>;
export type UpsertAttendeeMutationResult = Apollo.MutationResult<UpsertAttendeeMutation>;
export type UpsertAttendeeMutationOptions = Apollo.BaseMutationOptions<UpsertAttendeeMutation, UpsertAttendeeMutationVariables>;
export const DeleteAttendeeDocument = gql`
    mutation DeleteAttendee($params: AttendeeKeyInput!) {
  deleteAttendee(params: $params) {
    userId
    eventId
  }
}
    `;
export type DeleteAttendeeMutationFn = Apollo.MutationFunction<DeleteAttendeeMutation, DeleteAttendeeMutationVariables>;

/**
 * __useDeleteAttendeeMutation__
 *
 * To run a mutation, you first call `useDeleteAttendeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAttendeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAttendeeMutation, { data, loading, error }] = useDeleteAttendeeMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useDeleteAttendeeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAttendeeMutation, DeleteAttendeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAttendeeMutation, DeleteAttendeeMutationVariables>(DeleteAttendeeDocument, options);
      }
export type DeleteAttendeeMutationHookResult = ReturnType<typeof useDeleteAttendeeMutation>;
export type DeleteAttendeeMutationResult = Apollo.MutationResult<DeleteAttendeeMutation>;
export type DeleteAttendeeMutationOptions = Apollo.BaseMutationOptions<DeleteAttendeeMutation, DeleteAttendeeMutationVariables>;
export const DecoderDocument = gql`
    query decoder {
  decoder {
    category {
      code
      name
      id
    }
    divisionCode {
      code
    }
  }
}
    `;

/**
 * __useDecoderQuery__
 *
 * To run a query within a React component, call `useDecoderQuery` and pass it any options that fit your needs.
 * When your component renders, `useDecoderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDecoderQuery({
 *   variables: {
 *   },
 * });
 */
export function useDecoderQuery(baseOptions?: Apollo.QueryHookOptions<DecoderQuery, DecoderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DecoderQuery, DecoderQueryVariables>(DecoderDocument, options);
      }
export function useDecoderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DecoderQuery, DecoderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DecoderQuery, DecoderQueryVariables>(DecoderDocument, options);
        }
export type DecoderQueryHookResult = ReturnType<typeof useDecoderQuery>;
export type DecoderLazyQueryHookResult = ReturnType<typeof useDecoderLazyQuery>;
export type DecoderQueryResult = Apollo.QueryResult<DecoderQuery, DecoderQueryVariables>;
export const GetEventAllDocument = gql`
    query GetEventAll {
  getEventAll {
    userId
    id
    categoryId
    name
    location
    detail
    begin
    end
    isTemporary
    lastUpdate
    createdDate
  }
}
    `;

/**
 * __useGetEventAllQuery__
 *
 * To run a query within a React component, call `useGetEventAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEventAllQuery(baseOptions?: Apollo.QueryHookOptions<GetEventAllQuery, GetEventAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventAllQuery, GetEventAllQueryVariables>(GetEventAllDocument, options);
      }
export function useGetEventAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventAllQuery, GetEventAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventAllQuery, GetEventAllQueryVariables>(GetEventAllDocument, options);
        }
export type GetEventAllQueryHookResult = ReturnType<typeof useGetEventAllQuery>;
export type GetEventAllLazyQueryHookResult = ReturnType<typeof useGetEventAllLazyQuery>;
export type GetEventAllQueryResult = Apollo.QueryResult<GetEventAllQuery, GetEventAllQueryVariables>;
export const GetEventDocument = gql`
    query GetEvent($eventId: Int!) {
  getEvent(eventId: $eventId) {
    userId
    id
    categoryId
    name
    location
    detail
    begin
    end
    isTemporary
    lastUpdate
    createdDate
  }
}
    `;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
      }
export function useGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventQueryResult = Apollo.QueryResult<GetEventQuery, GetEventQueryVariables>;
export const GetEventListDocument = gql`
    query getEventList($params: EventUpsert) {
  getEventList(params: $params) {
    userId
    id
    categoryId
    name
    location
    detail
    begin
    end
    isTemporary
    lastUpdate
    createdDate
  }
}
    `;

/**
 * __useGetEventListQuery__
 *
 * To run a query within a React component, call `useGetEventListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventListQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useGetEventListQuery(baseOptions?: Apollo.QueryHookOptions<GetEventListQuery, GetEventListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventListQuery, GetEventListQueryVariables>(GetEventListDocument, options);
      }
export function useGetEventListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventListQuery, GetEventListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventListQuery, GetEventListQueryVariables>(GetEventListDocument, options);
        }
export type GetEventListQueryHookResult = ReturnType<typeof useGetEventListQuery>;
export type GetEventListLazyQueryHookResult = ReturnType<typeof useGetEventListLazyQuery>;
export type GetEventListQueryResult = Apollo.QueryResult<GetEventListQuery, GetEventListQueryVariables>;
export const UpsertEventDocument = gql`
    mutation UpsertEvent($params: EventUpsert!) {
  upsertEvent(params: $params) {
    id
  }
}
    `;
export type UpsertEventMutationFn = Apollo.MutationFunction<UpsertEventMutation, UpsertEventMutationVariables>;

/**
 * __useUpsertEventMutation__
 *
 * To run a mutation, you first call `useUpsertEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertEventMutation, { data, loading, error }] = useUpsertEventMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUpsertEventMutation(baseOptions?: Apollo.MutationHookOptions<UpsertEventMutation, UpsertEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertEventMutation, UpsertEventMutationVariables>(UpsertEventDocument, options);
      }
export type UpsertEventMutationHookResult = ReturnType<typeof useUpsertEventMutation>;
export type UpsertEventMutationResult = Apollo.MutationResult<UpsertEventMutation>;
export type UpsertEventMutationOptions = Apollo.BaseMutationOptions<UpsertEventMutation, UpsertEventMutationVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($params: EventUpsert!) {
  createEvent(params: $params) {
    id
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($id: Int!) {
  getUser(id: $id) {
    id
    isAdmin
    givenName
    familyName
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUserListGroupDocument = gql`
    query GetUserListGroup {
  getUserListGroup {
    givenName
    familyName
    givenKana
    familyKana
    email
    password
    division
    position
    iconPath
    iconName
    description
    theme
    isAdmin
    isStop
    lastUpdate
    attendees
  }
}
    `;

/**
 * __useGetUserListGroupQuery__
 *
 * To run a query within a React component, call `useGetUserListGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserListGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserListGroupQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserListGroupQuery(baseOptions?: Apollo.QueryHookOptions<GetUserListGroupQuery, GetUserListGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserListGroupQuery, GetUserListGroupQueryVariables>(GetUserListGroupDocument, options);
      }
export function useGetUserListGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserListGroupQuery, GetUserListGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserListGroupQuery, GetUserListGroupQueryVariables>(GetUserListGroupDocument, options);
        }
export type GetUserListGroupQueryHookResult = ReturnType<typeof useGetUserListGroupQuery>;
export type GetUserListGroupLazyQueryHookResult = ReturnType<typeof useGetUserListGroupLazyQuery>;
export type GetUserListGroupQueryResult = Apollo.QueryResult<GetUserListGroupQuery, GetUserListGroupQueryVariables>;
export const UpsertUserDocument = gql`
    mutation UpsertUser($params: UserUpsert!) {
  upsertUser(params: $params) {
    id
    email
    password
  }
}
    `;
export type UpsertUserMutationFn = Apollo.MutationFunction<UpsertUserMutation, UpsertUserMutationVariables>;

/**
 * __useUpsertUserMutation__
 *
 * To run a mutation, you first call `useUpsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertUserMutation, { data, loading, error }] = useUpsertUserMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUpsertUserMutation(baseOptions?: Apollo.MutationHookOptions<UpsertUserMutation, UpsertUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertUserMutation, UpsertUserMutationVariables>(UpsertUserDocument, options);
      }
export type UpsertUserMutationHookResult = ReturnType<typeof useUpsertUserMutation>;
export type UpsertUserMutationResult = Apollo.MutationResult<UpsertUserMutation>;
export type UpsertUserMutationOptions = Apollo.BaseMutationOptions<UpsertUserMutation, UpsertUserMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($params: UserUpsert!) {
  createUser(params: $params) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($params: UserLoginInput!) {
  login(params: $params) {
    userId
    email
    isAdmin
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($params: ChangePasswordInput!) {
  changePassword(params: $params) {
    userId
    status
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;