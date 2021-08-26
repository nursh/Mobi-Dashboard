import React from 'react';
import { NavLink, useLocation, matchPath } from 'react-router-dom';
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
  },
});

interface Props {
  title: string;
  Icon: SvgIconComponent;
  href: string;
}

export const SidebarItem = ({ title, Icon, href }: Props) => {
  const classes = useStyles();
  const location = useLocation();
  const active = !!matchPath(href, location.pathname);

  return (
    <ListItem className={classes.listItem}>
      <Button
        component={NavLink}
        to={href}
        className={classes.navButton}
        style={{
          ...(active && { backgroundColor: "#1e145a", color: "#FFF" }),
        }}
      >
        <Icon classes={{ root: classes.icon }} />
        <Typography variant="subtitle1">{title}</Typography>
      </Button>
    </ListItem>
  );
}