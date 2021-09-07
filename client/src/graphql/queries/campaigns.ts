import { gql } from "@apollo/client";

export const GET_CAMPAIGNS = gql`
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
