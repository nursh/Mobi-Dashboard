import { Collection, ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  campaigns: ObjectId[];
}

type Status = 'Active' | 'Pending' | 'Completed';
type Request = 'On Hold' | 'Submitted';

export interface Campaign {
  _id: ObjectId;
  id: string;
  name: string;
  status: Status;
  request: Request;
}

export interface Database {
  campaigns: Collection<Campaign>;
  users: Collection<User>;
}