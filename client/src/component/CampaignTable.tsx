import React from 'react';
import { useGetUserQuery } from '../generated/graphql';

export function CampaignTable() {
  const { data, loading, error } = useGetUserQuery();

  if (error) {
    throw new Error(`Something went wrong: ${error}`);
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const renderUserCampaigns= () => {
    if (data) {
      const { campaigns } = data.user;
      return campaigns?.map(campaign => (
        <tr>
          <td>{campaign?.id}</td>
          <td>{campaign?.name}</td>
          <td>{campaign?.creationDate}</td>
          <td>{campaign?.status}</td>
          <td>{campaign?.request}</td>
        </tr>
      ))
    }
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