import React, { useState } from "react";
import { ApolloQueryResult } from '@apollo/client';
import {
  makeStyles,
  MenuItem,
  TextField,
  InputAdornment,
  TextFieldProps,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { quarterOptions, requestOptions, statusOptions } from "./FilterOptions";
import { createFilter } from './FilterRefetch';
import { GetCampaignsQuery } from '../../generated/graphql';


const useStyles = makeStyles({
  search: {
    "& > div": {
      borderRadius: 20,
    },
    flex: 1.8
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  root: {
    minWidth: 200,
    marginLeft: 30,
    flex: 1,
    "& > div": {
      borderRadius: 20,
    },
    "& > .Mui-focused": {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderWidth: "1px",
    },
  },
  outline: {
    borderWidth: "1px !important",
    borderColor: "black !important",
  },
  dropMenu: {
    boxShadow: "none",
    border: "1px solid black",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

function FilterTextField(props: TextFieldProps) {
  const classes = useStyles();
  const { children, onChange, value, name } = props;
  return (
    <TextField
      variant="outlined"
      select
      value={value}
      name={name}
      onChange={onChange}
      classes={{
        root: classes.root,
      }}
      InputProps={{
        classes: {
          notchedOutline: classes.outline,
        },
      }}
      SelectProps={{
        defaultValue: "All Campaigns",
        MenuProps: {
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          classes: {
            paper: classes.dropMenu,
          },
        },
      }}
    >
      {children}
    </TextField>
  );
}


interface FilterOptions {
  key: string;
  value: string;
}

interface FilterFormProps {
  refetch: (variables?: {}) => Promise<ApolloQueryResult<GetCampaignsQuery>>;
}


export function FilterForm({ refetch }: FilterFormProps) {
  const classes = useStyles();
  const [status, setStatus] = useState(statusOptions[0].value);
  const [search, setSearch] = useState('');
  const [quarter, setQuarter] = useState(quarterOptions[0].value);
  const [request, setRequest] = useState(requestOptions[0].value);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let filters;
    switch(event.target.name) {
      case 'status': 
        setStatus(event.target.value);
        filters = createFilter({
          status: event.target.value,
          request,
          quarter
        });
        break;
      case 'quarter': 
        setQuarter(event.target.value);
        filters = createFilter({
          status,
          request,
          quarter: event.target.value,
        });
        break;
      case 'request': 
        setRequest(event.target.value);
        filters = createFilter({
          status,
          request: event.target.value,
          quarter
        });
        break;
      default:
        break;
    }
    await refetch({ filters });
    setTimeout(() => (document.activeElement as HTMLElement).blur(), 0);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(search);
    await refetch({
      search
    });
  }

  const renderOptions = (filterOptions: FilterOptions[]) => {
    return filterOptions.map(({ key, value }) => (
      <MenuItem key={key} value={value}>
        {key}
      </MenuItem>
    ));
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSearchSubmit}>
        <TextField
          className={classes.search}
          onChange={handleSearchChange}
          value={search}
          name="search"
          variant="outlined"
          placeholder="Search campaigns"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </form>

      <FilterTextField name="status" value={status} onChange={handleChange}>
        {renderOptions(statusOptions)}
      </FilterTextField>

      <FilterTextField value={quarter} onChange={handleChange} name="quarter">
        {renderOptions(quarterOptions)}
      </FilterTextField>

      <FilterTextField value={request} onChange={handleChange} name="request">
        {renderOptions(requestOptions)}
      </FilterTextField>
    </div>
  );
}