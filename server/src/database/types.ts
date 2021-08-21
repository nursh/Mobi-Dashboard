import { Collection, ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  campaigns: ObjectId[];
}

export type Status = 'Active' | 'Pending' | 'Completed';
export type Request = 'On Hold' | 'Submitted';

export interface Campaign {
  _id: ObjectId;
  id: string;
  name: string;
  status: Status;
  request: Request;
  creationDate: Date;
}

export interface Database {
  campaigns: Collection<Campaign>;
  users: Collection<User>;
}