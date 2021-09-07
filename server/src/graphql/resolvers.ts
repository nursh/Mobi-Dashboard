import express from 'express';
import { User, Database, Campaign, Status, Request } from '../database';
import { buildQuery } from './queryBuilder';


interface Context {
  db: Database;
  req: express.Request;
  res: express.Response;
}

export interface CampaignFilter {
  status: Status;
  request: Request;
  quarter: string;
}

export interface CampaignArgs {
  search: string;
  filters: CampaignFilter;
}

export const resolvers = {
  Status,
  Request,
  Query: {
    user: async (_obj: {}, _args: {}, { db }: Context): Promise<User> => {
      try {
        const user = await db.users.findOne();
        if (!user) {
          throw new Error('There is no user in the database');
        }
        return user;
      } catch(error) {
        throw new Error(`Failed to fetch User: ${error}`)
      }
    }
  },
  User: {
    id: (user: User): string => user._id.toHexString(),
    campaigns: async (user: User, args: CampaignArgs, { db }: Context): Promise<Campaign[]> => {
      try {
        let query;
        if (JSON.stringify(args) !== '{}') {
          query = buildQuery(args);
        } else {
          query = [{ $match: { _id: { $in: user.campaigns } } }];
        }
        const cursor = db.campaigns.aggregate(query);
        const campaigns = await cursor.toArray();
        return campaigns;
      } catch (error) {
        throw new Error(`Failed to get campaigns: ${error}`)
      } 
    }
  },
  Campaign: {
    id: (campaign: Campaign): string => campaign.id,
    creationDate: (campaign: Campaign): string => {
      const date = new Date(campaign.creationDate);
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(date);
      return formattedDate;
    }
  }
}