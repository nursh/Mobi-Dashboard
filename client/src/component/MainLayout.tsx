import React from "react";
import { Outlet } from 'react-router-dom';
import { makeStyles, CssBaseline } from "@material-ui/core";
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { CampaignTable } from "./Home/CampaignTable";
import { useGetUserQuery } from "../generated/graphql";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  content: {
    padding: '134px 50px 15px',
  }
});

export function MainLayout() {
  const classes = useStyles();
  const { data, loading, error } = useGetUserQuery();

  if (error) {
    throw new Error(`Something went wrong: ${error}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const contents = () => {
    if (data) {
      return <Sidebar user={data.user} />;
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      {contents()}
      <main className={classes.content}>
        <Outlet />
      </main>
      {/* <CampaignTable /> */}
    </div>
  );
}