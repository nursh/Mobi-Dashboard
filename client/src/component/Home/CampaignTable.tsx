import React from 'react';
import {
  Divider,
  makeStyles,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { FilterForm } from './FilterForm';
import { Campaign } from '../../generated/graphql';


const useStyles = makeStyles({
  root: {
    marginTop: 15
  },
  container: {
    padding: 15
  }
});

interface Props {
  campaigns: Campaign[];
}

export const CampaignTable = ({ campaigns }: Props) => {
  const classes = useStyles();

  const renderUserCampaigns= () => {
    return campaigns.map((campaign) => (
      <TableRow>
        <TableCell>{campaign.id}</TableCell>
        <TableCell>{campaign.name}</TableCell>
        <TableCell>{campaign.creationDate}</TableCell>
        <TableCell>{campaign.status}</TableCell>
        <TableCell>{campaign.request}</TableCell>
      </TableRow>
    ));
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.container}>
        <FilterForm />
      </div>
      <Divider />
      <div className={classes.container}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Campaign Id</TableCell>
                <TableCell>Campaign Name</TableCell>
                <TableCell>Campaign Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Request</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderUserCampaigns()}</TableBody>
          </Table>
        </TableContainer>
      </div>
      <Divider />
    </Paper>
  );
}