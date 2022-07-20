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

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ChangePasswordResponse;
  login: UserLoginResponse;
  upsertUser: UserUpsertResponse;
};


export type MutationChangePasswordArgs = {
  params: ChangePasswordInput;
};


export type MutationLoginArgs = {
  params: UserLoginInput;
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
  getEvent: Event;
  getEventAll: Array<Event>;
  getUser: User;
  getUserListGroup: Array<Array<User>>;
};


export type QueryGetEventArgs = {
  eventId: Scalars['Int'];
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

export type DecoderQueryVariables = Exact<{ [key: string]: never; }>;


export type DecoderQuery = { __typename?: 'Query', decoder: { __typename?: 'Decoder', category: Array<{ __typename?: 'DecoderItem', code: string, name?: string | null }>, divisionCode: Array<{ __typename?: 'DecoderItem', code: string }> } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, isAdmin: boolean, givenName: string, familyName: string } };

export type UpsertUserMutationVariables = Exact<{
  params: UserUpsert;
}>;


export type UpsertUserMutation = { __typename?: 'Mutation', upsertUser: { __typename?: 'UserUpsertResponse', id: string, email: string, password: string } };

export type LoginMutationVariables = Exact<{
  params: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserLoginResponse', userId: number, email: string, isAdmin: boolean } };

export type ChangePasswordMutationVariables = Exact<{
  params: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordResponse', userId: string, status: ChangePasswordStatusDef } };


export const DecoderDocument = gql`
    query decoder {
  decoder {
    category {
      code
      name
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