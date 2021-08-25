import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core';
import {
  AccountCircle,
  Settings,
  Notifications,
  Group
} from '@material-ui/icons';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: '#1e145a'
    }
  })
);

export function Header() {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <div className={classes.grow} />
        <IconButton>
          <Group htmlColor="#fff" />
        </IconButton>
        <IconButton>
          <Notifications htmlColor="#fff" />
        </IconButton>
        <IconButton>
          <Settings htmlColor="#fff" />
        </IconButton>
        <IconButton>
          <AccountCircle fontSize="large" htmlColor="#fff"/>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}