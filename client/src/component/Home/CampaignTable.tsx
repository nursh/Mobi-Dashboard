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
  TablePagination, 
  Button
} from '@material-ui/core';
import { Help } from '@material-ui/icons';
import { FilterForm } from './FilterForm';
import { StatusPill } from './StatusPill';
import { HelpDialogue } from './HelpDialogue';
import { Campaign } from '../../generated/graphql';


const useStyles = makeStyles({
  root: {
    marginTop: 20
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
  const [rowsPerpage, setRowsPerChange] = useState(5);
  const { handleClickOpen, element: dialogElement } = HelpDialogue();

  const handlePageChange = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerChange(+event.target.value);
    setPage(0);
  }

  const formatRequest = (request: string) => {
    if (request === 'SUBMITTED') return 'Submitted';
    return 'On Hold';
  }

  const renderUserCampaigns= () => {
    const currentPage = page * rowsPerpage;
    const noOfRows = currentPage + rowsPerpage;
    return campaigns.slice(currentPage, noOfRows).map((campaign) => (
      <TableRow key={campaign.id}>
        <TableCell>{campaign.id}</TableCell>
        <TableCell>{campaign.name}</TableCell>
        <TableCell>{campaign.creationDate}</TableCell>
        <TableCell>{<StatusPill status={campaign.status} />}</TableCell>
        <TableCell>{formatRequest(campaign.request)}</TableCell>
        <TableCell />
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
                <TableCell>Campaign ID</TableCell>
                <TableCell>Campaign Name</TableCell>
                <TableCell>Campaign Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Request</TableCell>
                <TableCell>
                  <Button disableRipple disableElevation onClick={handleClickOpen}>
                    <Help htmlColor="#9e9e9e" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderUserCampaigns()}</TableBody>
          </Table>
        </TableContainer>
      </div>
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
      {dialogElement}
    </Paper>
  );
}