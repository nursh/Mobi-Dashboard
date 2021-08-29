import React, { useState } from "react";
import {
  FormControl,
  NativeSelect,
  InputBase,
  Select,
  Theme,
  makeStyles,
  withStyles,
  createStyles,
  MenuItem
} from "@material-ui/core";


const SelectInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '10px 20px',
      border: '1px solid #ced4da',
      borderRadius: 10,

      '&:focus': {
        backgroundColor: 'transparent',
        padding: '10px 20px',
        borderRadius: 10
      }
    },
    select: { },
    icon: {
      fontSize: '2rem',
      marginTop: -5,
      paddingLeft: 5,
      paddingRight: 5
    }
    // input: {
    //   borderRadius: 4,
    //   position: "relative",
    //   backgroundColor: theme.palette.background.paper,
    //   border: "1px solid #ced4da",
    //   fontSize: 16,
    //   padding: "10px 26px 10px 12px",
    //   transition: theme.transitions.create(["border-color", "box-shadow"]),
    //   "&:focus": {
    //     borderRadius: 4,
    //   },
    // },
  })
)(Select);

const useStyles = makeStyles({
  option: {
    backgroundColor: 'red'
  },
  noUnderline: {
    '&:hover': {
      borderBottom: 'none',
      transition: 'none'
    },
    '&:before': {
      borderBottom: 'none',
      transition: 'none'
    },
    '&:after': {
      borderBottom: 'none',
      transition: 'none'
    },
    '&.Mui-disabled:before': {
      borderBottom: 'none'
    }
  }
});


export function FilterForm() {
  const classes = useStyles();
  const [status, setStatus] = useState('');
  const handleChange = (event: React.ChangeEvent<{value: unknown}>) => {
    setStatus(event.target.value as string);
  }

  return (
    <>
      <FormControl>
        <SelectInput
          id="status"
          value={status}
          displayEmpty
          onChange={handleChange}
          className={classes.noUnderline}
        >
          <MenuItem value="">All Campaigns</MenuItem>
          <MenuItem value="Pending">Pending Campaigns</MenuItem>
          <MenuItem value="Active">Active Campaigns</MenuItem>
          <MenuItem value="Completed">Completed Campaigns</MenuItem>
        </SelectInput>
      </FormControl>
    </>
  );
}