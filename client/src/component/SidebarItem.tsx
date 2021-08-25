import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ListItem,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';


const useStyles = makeStyles({
  listItem: {
    padding: 0
  },
  icon: {
    minWidth: "auto",
    marginRight: 10,
  },
  navButton: {
    display: 'flex',
    justifyContent: 'flex-start', 
    textTransform: "none",
    transition: "none",
    padding: '8px 16px',
    width: '100%',
    "&:active": {
      backgroundColor: "#1e145a",
      color: "#FFF",
    },
  },
});

interface Props {
  title: string;
  Icon: SvgIconComponent;
}

export const SidebarItem = ({ title, Icon }: Props) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.listItem}>
      <Button
        component={NavLink}
        to="/"
        className={classes.navButton}
      >
        <Icon classes={{ root: classes.icon }} />
        <Typography variant="subtitle1">{title}</Typography>
      </Button>
    </ListItem>
  );
}