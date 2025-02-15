import { Request } from 'express';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePicture: string;
  isEmailVerified: boolean;
}

export interface RequestWithUser extends Request {
  user: User;
}
