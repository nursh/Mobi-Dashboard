import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    user: User!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    campaigns: [Campaign]
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