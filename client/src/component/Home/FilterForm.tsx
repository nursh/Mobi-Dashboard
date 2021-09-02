import React, { useState } from "react";
import {
  makeStyles,
  MenuItem,
  TextField,
  InputAdornment,
  TextFieldProps,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { quarterOptions, requestOptions, statusOptions } from "./FilterOptions";


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


export function FilterForm() {
  const classes = useStyles();
  const [status, setStatus] = useState(statusOptions[0].value);
  const [search, setSearch] = useState('');
  const [quarters, setQuarters] = useState(quarterOptions[0].value);
  const [request, setRequest] = useState(requestOptions[0].value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch(event.target.name) {
      case 'status': 
        setStatus(event.target.value);
        break;
      case 'quarters': 
        setQuarters(event.target.value);
        break;
      case 'request': 
        setRequest(event.target.value);
        break;
      default:
        break;
    }
    setTimeout(() => (document.activeElement as HTMLElement).blur(), 0);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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
      <TextField
        className={classes.search}
        onChange={handleSearchChange}
        value={search}
        variant="outlined"
        placeholder="Search campaigns"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />

      <FilterTextField
        name="status"
        value={status}
        onChange={handleChange}
      >
        {renderOptions(statusOptions)}
      </FilterTextField>

      <FilterTextField
        value={quarters}
        onChange={handleChange}
        name="quarters"
      >
        {renderOptions(quarterOptions)}
      </FilterTextField>

      <FilterTextField
        value={request}
        onChange={handleChange}
        name="request"
      >
        {renderOptions(requestOptions)}
      </FilterTextField>
    </div>
  );
}