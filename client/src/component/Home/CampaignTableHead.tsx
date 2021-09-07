import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Button
} from '@material-ui/core';
import { Help } from '@material-ui/icons';
import { Order, TableCampaign } from './TableSorting';


interface TableTitle {
  id: keyof TableCampaign;
  title: string;
}

const tableHeads: TableTitle[] = [
  { id: 'id', title: 'Campaign ID' },
  { id: 'name', title: 'Campaign Name' },
  { id: 'creationDate', title: 'Creation Date' },
  { id: 'status', title: 'Status' },
  { id: 'request', title: 'Request' },
]

interface TableHeadProps {
  order: Order;
  orderBy: string;
  handleSortRequest: (evt: React.MouseEvent<unknown>, property: keyof TableCampaign) => void;
  handleClickOpen: () => void;
}

export function CampaignTableHead(props: TableHeadProps) {
  const { order, orderBy, handleSortRequest, handleClickOpen } = props;

  const createSortHandler = (property: keyof TableCampaign) => (event: React.MouseEvent<unknown>) => {
    handleSortRequest(event, property);
  }

  return (
    <TableHead>
      <TableRow>
        {
          tableHeads.map(({ id, title }) => (
            <TableCell
              key={id}
              sortDirection={orderBy === id ? order : false}
              style={{
                fontSize: 18
              }}
            >
              <TableSortLabel
                active={orderBy === id}
                direction={orderBy === id ? order : 'asc'}
                onClick={createSortHandler(id)}
              >
                {title}
              </TableSortLabel>
            </TableCell>
          ))
        }
        <TableCell>
          <Button disableRipple disableElevation onClick={handleClickOpen}>
            <Help htmlColor="#9e9e9e" />
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}