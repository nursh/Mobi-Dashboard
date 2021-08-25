import React from 'react';
import {
  Drawer,
  makeStyles,
  List,
  Toolbar,
  Avatar,
  Box,
  Typography, 
  Divider,
  Button
} from '@material-ui/core';
import {
  Home,
  BarChart,
  SmsRounded
} from '@material-ui/icons';
import { User } from '../generated/graphql';
import { SidebarItem } from './SidebarItem';


const drawerWidth = 300;
const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  icon: {
    minWidth: "auto",
    marginRight: 10,
    borderColor: '#212121',
    borderWidth: 10
  },
  avatar: {
    width: "90%",
    margin: "30px auto 15px",
    backgroundColor: "#eee",
    padding: "15px 20px",
    borderRadius: 10
  },
  itemsContainer: {
    margin: "15px 0",
    padding: "0 15px",
  },
  semiboldText: {
    fontWeight: 500,
  },
  orangeButton: {
    backgroundColor: "#ff9f32",
    color: "#fff",
    marginTop: 20,
    textTransform: "capitalize",
    width: "100%",
    borderRadius: 50,
    "&:hover": {
      backgroundColor: "#394c81"
    },
  },
});

const sidebarItems = [
  {
    title: 'Home',
    Icon: Home
  },
  {
    title: 'Campaigns',
    Icon: BarChart
  },
  {
    title: 'Support',
    Icon: SmsRounded
  }
]

interface Props {
  user: Pick<User, "firstName" | "lastName" | "imageUrl">
}


export function Sidebar({ user }: Props) {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
    >
      <Toolbar />
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        className={classes.avatar}
      >
        <Avatar src={user.imageUrl} className={classes.icon} />
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          flexGrow={1}
        >
          <Typography style={{ marginRight: 5}}>{user.firstName}</Typography>
          <Typography>{user.lastName}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box className={classes.itemsContainer}>
        <Typography variant="button">Reports</Typography>
        <List>
          {sidebarItems.map((item) => (
            <SidebarItem
              title={item.title}
              Icon={item.Icon}
              key={item.title}
            />
          ))}
        </List>
      </Box>
      <Divider />
      <Box className={classes.itemsContainer}>
        <Typography paragraph className={classes.semiboldText}>
          Need Help?
        </Typography>
        <Typography>
          Hover over an item, or <br />
          Check out our docs linked below
        </Typography>
        <Button variant="contained" className={classes.orangeButton} size="large">
          Documentation
        </Button>
      </Box>
    </Drawer>
  );
}