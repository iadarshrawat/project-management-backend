import { Types } from 'mongoose';

export interface PublicMonitorAccessInterface {
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  publicId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
