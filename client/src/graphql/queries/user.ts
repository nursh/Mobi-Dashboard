import { gql } from '@apollo/client';


export const GET_USER = gql`
  query GetUser {
    user {
      firstName
      lastName
      imageUrl
      campaigns {
        id
        name
        status
        request
        creationDate
      }
    }
  }
`;