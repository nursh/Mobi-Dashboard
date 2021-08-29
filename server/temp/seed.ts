require('dotenv').config();

import { connectDatabase, User, Campaign } from "../src/database";
import { ObjectId } from "mongodb";
import faker from 'faker';

import {
  getCampaignName,
  getCampaignId,
  getCampaignRequest,
  getCampaignStatus,
  getCampaignDate
} from './utils';


function generateCampaign(): Campaign {
  return {
    _id: new ObjectId(),
    id: getCampaignId(),
    name: getCampaignName(),
    creationDate: getCampaignDate(),
    status: getCampaignStatus(),
    request: getCampaignRequest()
  }
}

const seed = async () => {
  try {
    console.log('[seeding database]: running...');
    const db = await connectDatabase();
    const noOfCampaigns = 20;
    const campaignIds: ObjectId[] = [];

    for (let i = 0; i < noOfCampaigns; i += 1) {
      let campaign = generateCampaign();
      campaignIds.push(campaign._id);
      await db.campaigns.insertOne(campaign);
    }

    const user: User = {
      _id: new ObjectId(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      imageUrl: faker.image.imageUrl(),
      campaigns: campaignIds
    };
    db.users.insertOne(user);

    

    console.log('[seeding database]: success...');
  } catch (error) {
    throw new Error('Failed to seed database');
  }
}

seed();
