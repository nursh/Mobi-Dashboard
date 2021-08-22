import express from 'express';
import { User, Database, Campaign, Status, Request } from '../database';


interface Context {
  db: Database;
  req: express.Request;
  res: express.Response;
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
    campaigns: async (user: User, _args: {}, { db }: Context): Promise<Campaign[]> => {
      try {
        const cursor = db.campaigns.find({
          _id: { $in: user.campaigns }
        });
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
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(date);
      return formattedDate;
    }
  }
}