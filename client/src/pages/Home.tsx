import React from 'react';
import { NavTabs } from '../component';
import { useGetCampaignsQuery } from '../generated/graphql';

export function Home() {
  const { data, loading, error, refetch } = useGetCampaignsQuery({
    notifyOnNetworkStatusChange: true
  });

  if (error) {
    throw new Error(`Something went wrong: ${error}`);
  }

  const content = () => {
    if (data && data.user && data.user.campaigns) {
      const { campaigns } = data.user;
      return <NavTabs campaigns={campaigns} refetch={refetch} />
    }
  }
  
  return (
    <>
      {content()}
    </>
  )
}