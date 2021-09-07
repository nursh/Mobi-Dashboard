import { Campaign } from "../../generated/graphql";

export type TableCampaign = Omit<Campaign, "__typename">;

export function descendingComparator<TableCampaign>(a: TableCampaign, b: TableCampaign, orderBy: keyof TableCampaign) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  } else if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}


export type Order = "asc" | "desc";

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: {[key in Key]: string}, b: {[key in Key]: string}) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<TableCampaign>(campaigns: TableCampaign[], comparator: (a: TableCampaign, b: TableCampaign) => number) {
  const stabilizedThis = campaigns.map((campaign, index) => [campaign, index] as [TableCampaign, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}