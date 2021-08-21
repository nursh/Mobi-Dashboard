require('dotenv').config();

import { connectDatabase } from "../src/database";

const clear = async () => {
  try {
    console.log('[clearing database]: running...');

    const db = await connectDatabase();
    const campaigns = await db.campaigns.find({}).toArray();
    const users = await db.users.find({}).toArray();

    if (campaigns.length > 0) await db.campaigns.drop();
    if (users.length > 0) await db.users.drop();


    console.log('[clearing database]: success...');
  } catch(error) {
    throw new Error('Failed to clear database');
  }
}

clear();