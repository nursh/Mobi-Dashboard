require('dotenv').config();

import { connectDatabase, User, Campaign } from "../src/database";
import { ObjectId } from "mongodb";
import faker from 'faker';

import {
  getCampaignName,
  getCampaignId,
  getCampaignRequest,
  getCampaignStatus 
} from './utils';


function generateCampaign(): Campaign {
  return {
    _id: new ObjectId(),
    id: getCampaignId(),
    name: getCampaignName(),
    creationDate: new Date(),
    status: getCampaignStatus(),
    request: getCampaignRequest()
  }
}

const seed = async () => {
  try {
    console.log('[seeding database]: running...');
    const db = await connectDatabase();
    const noOfCampaigns = 20;

    const user: User = {
      _id: new ObjectId(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }
    db.users.insertOne(user);

    for (let i = 0; i < noOfCampaigns; i += 1) {
      await db.campaigns.insertOne(generateCampaign());
    }

    

    console.log('[seeding database]: success...');
  } catch (error) {
    throw new Error('Failed to seed database');
  }
}

seed();
