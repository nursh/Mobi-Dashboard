import React, { useState } from 'react';
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
  TablePagination
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
  const [page, setPage] = useState(0);
  const [rowsPerpage, setRowsPerChange] = useState(10);

  const handlePageChange = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerChange(+event.target.value);
    setPage(0);
  }

  const renderUserCampaigns= () => {
    const currentPage = page * rowsPerpage;
    const noOfRows = currentPage + rowsPerpage;
    return campaigns.slice(currentPage, noOfRows).map((campaign) => (
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
      <div className={classes.container}>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10]}
          rowsPerPage={rowsPerpage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
          count={campaigns.length}
        />
      </div>
    </Paper>
  );
}