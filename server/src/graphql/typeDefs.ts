import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    user: User!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    imageUrl: String!
    campaigns(search: String, filters: CampaignFilter): [Campaign!]!
  }

  input CampaignFilter {
    status: Status
    request: Request
    quarter: String
  }

  type Campaign {
    id: ID!
    name: String!
    request: Request!
    status: Status!
    creationDate: String!
  }

  enum Status {
    ACTIVE
    COMPLETED
    PENDING
  }

  enum Request {
    ON_HOLD
    SUBMITTED
  }
`;