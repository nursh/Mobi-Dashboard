import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Campaign = {
  __typename?: 'Campaign';
  id: Scalars['ID'];
  name: Scalars['String'];
  request: Request;
  status: Status;
  creationDate: Scalars['String'];
};

export type CampaignFilter = {
  status?: Maybe<Status>;
  request?: Maybe<Request>;
  quarter?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  user: User;
};

export enum Request {
  OnHold = 'ON_HOLD',
  Submitted = 'SUBMITTED'
}

export enum Status {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Pending = 'PENDING'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  imageUrl: Scalars['String'];
  campaigns: Array<Campaign>;
};


export type UserCampaignsArgs = {
  search?: Maybe<Scalars['String']>;
  filters?: Maybe<CampaignFilter>;
};

export type GetCampaignsQueryVariables = Exact<{
  search?: Maybe<Scalars['String']>;
  filters?: Maybe<CampaignFilter>;
}>;


export type GetCampaignsQuery = { __typename?: 'Query', user: { __typename?: 'User', campaigns: Array<{ __typename?: 'Campaign', id: string, name: string, status: Status, request: Request, creationDate: string }> } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', firstName: string, lastName: string, imageUrl: string } };


export const GetCampaignsDocument = gql`
    query GetCampaigns($search: String, $filters: CampaignFilter) {
  user {
    campaigns(search: $search, filters: $filters) {
      id
      name
      status
      request
      creationDate
    }
  }
}
    `;

/**
 * __useGetCampaignsQuery__
 *
 * To run a query within a React component, call `useGetCampaignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCampaignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCampaignsQuery({
 *   variables: {
 *      search: // value for 'search'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetCampaignsQuery(baseOptions?: Apollo.QueryHookOptions<GetCampaignsQuery, GetCampaignsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCampaignsQuery, GetCampaignsQueryVariables>(GetCampaignsDocument, options);
      }
export function useGetCampaignsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCampaignsQuery, GetCampaignsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCampaignsQuery, GetCampaignsQueryVariables>(GetCampaignsDocument, options);
        }
export type GetCampaignsQueryHookResult = ReturnType<typeof useGetCampaignsQuery>;
export type GetCampaignsLazyQueryHookResult = ReturnType<typeof useGetCampaignsLazyQuery>;
export type GetCampaignsQueryResult = Apollo.QueryResult<GetCampaignsQuery, GetCampaignsQueryVariables>;
export const GetUserDocument = gql`
    query GetUser {
  user {
    firstName
    lastName
    imageUrl
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
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
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

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    