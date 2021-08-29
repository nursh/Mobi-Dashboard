import { Collection, ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  imageUrl: string;
  campaigns: ObjectId[];
}

export enum Status {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED'
}

export enum Request {
  ON_HOLD = 'On Hold',
  SUBMITTED = 'Submitted'
}

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