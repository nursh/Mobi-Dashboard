import React from 'react';
import { Campaign } from '../../generated/graphql';

interface Props {
  campaigns: Campaign[];
}

export const CampaignTable = ({ campaigns }: Props) => {

  const renderUserCampaigns= () => {
    return campaigns.map(campaign => (
      <tr>
        <td>{campaign.id}</td>
        <td>{campaign.name}</td>
        <td>{campaign.creationDate}</td>
        <td>{campaign.status}</td>
        <td>{campaign.request}</td>
      </tr>
    ))
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Campaign Id</th>
          <th>Campaign Name</th>
          <th>Campaign Date</th>
          <th>Status</th>
          <th>Request</th>
        </tr>
      </thead>
      <tbody>
        {renderUserCampaigns()}
      </tbody>
    </table>
  );
}