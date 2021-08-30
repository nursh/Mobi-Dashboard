import React from 'react';
import {
  makeStyles
} from '@material-ui/core';
import { Status } from '../../generated/graphql';

interface PillProps {
  status: Status;
}

const pillStyles = makeStyles({
  statusPill: {
    borderRadius: 30,
    fontWeight: 500,
    padding: "10px 15px",
    width: "fit-content",
    background: (props: PillProps) =>
      props.status === "ACTIVE"
        ? "#3d23ea"
        : props.status === "PENDING"
        ? "#ff9f32"
        : "#d9e2ec",
    color: (props: PillProps) =>
      props.status === "COMPLETED" ? "black" : "#ffffff",
  },
});

export const StatusPill = (props: PillProps) => {
  const classes = pillStyles(props);
  return <div className={classes.statusPill}>{props.status}</div>;
};