import { CampaignArgs } from './resolvers';
import { Campaign} from '../database';
import { Document } from 'mongodb';

const quartersMonth: { [key: string]: number[] } = {
  "1st": [1, 2, 3, 4],
  "2nd": [5, 6, 7, 8],
  "3rd": [9, 10, 11, 12],
};

export function buildQuery(args: CampaignArgs): Document[] {
  const query: Document[] = [];

  if (args.search) {
    query.push({
      $match: {
        $text: {
          $search: args.search,
        },
      },
    });
  }

  if (args.filters.status) {
    query.push({
      $match: {
        status: args.filters.status,
      },
    });
  }

  if (args.filters.request) {
    query.push({
      $match: {
        request: args.filters.request,
      },
    });
  }

  if (args.filters.quarter) {
    query.push({
      $project: {
        id: 1,
        creationDate: 1,
        status: 1,
        request: 1,
        name: 1,
        month: { $month: "$creationDate" }
      }
    });

    query.push({
      $match: {
        month: {
          $in: quartersMonth[args.filters.quarter]
        }
      }
    })
  }

  return query;
}