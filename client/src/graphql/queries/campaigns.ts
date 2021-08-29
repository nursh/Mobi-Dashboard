import { gql } from "@apollo/client";

export const GET_CAMPAIGNS = gql`
  query GetCampaigns {
    user {
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
