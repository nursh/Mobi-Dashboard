import { MongoClient } from 'mongodb';
import { Database, User, Campaign } from './types';

const url =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.abx3p.mongodb.net/dev?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);
  const db = client.db('dashboard');

  return {
    users: db.collection<User>('users'),
    campaigns: db.collection<Campaign>('campaigns')
  };
}