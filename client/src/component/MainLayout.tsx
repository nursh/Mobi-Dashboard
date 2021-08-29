import React from "react";
import { Outlet } from 'react-router-dom';
import { makeStyles, CssBaseline } from "@material-ui/core";
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useGetUserQuery } from "../generated/graphql";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  content: {
    padding: '130px 50px 15px',
    flex: 1
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

  const sideBar = () => {
    if (data) {
      return <Sidebar user={data.user} />;
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      {sideBar()}
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
}