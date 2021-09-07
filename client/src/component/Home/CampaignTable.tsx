import React, { useState } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import {
  Divider,
  makeStyles,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TablePagination, 
} from '@material-ui/core';
import { FilterForm } from './FilterForm';
import { StatusPill } from './StatusPill';
import { HelpDialogue } from './HelpDialogue';
import { getComparator, Order, stableSort, TableCampaign } from './TableSorting';
import { CampaignTableHead } from './CampaignTableHead';
import { GetCampaignsQuery } from '../../generated/graphql';


const useStyles = makeStyles({
  root: {
    marginTop: 20
  },
  container: {
    padding: 15
  }
});



interface Props {
  campaigns: TableCampaign[];
  refetch: (variables?: {}) => Promise<ApolloQueryResult<GetCampaignsQuery>>;
}

export const CampaignTable = ({ campaigns, refetch }: Props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerpage, setRowsPerChange] = useState(5);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof TableCampaign>('id');
  const { handleClickOpen, element: dialogElement } = HelpDialogue();

  const handlePageChange = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerChange(+event.target.value);
    setPage(0);
  }
  const handleSortRequest = (event: React.MouseEvent<unknown>, property: keyof TableCampaign) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  const formatRequest = (request: string) => {
    if (request === 'SUBMITTED') return 'Submitted';
    return 'On Hold';
  }

  const renderUserCampaigns= () => {
    const currentPage = page * rowsPerpage;
    const noOfRows = currentPage + rowsPerpage;
    return stableSort(campaigns, getComparator(order, orderBy))
      .slice(currentPage, noOfRows)
      .map((campaign) => (
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
        <FilterForm refetch={refetch} />
      </div>
      <Divider />
      <div className={classes.container}>
        <TableContainer>
          <Table>
            <CampaignTableHead
              order={order}
              orderBy={orderBy}
              handleSortRequest={handleSortRequest}
              handleClickOpen={handleClickOpen}
            />
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