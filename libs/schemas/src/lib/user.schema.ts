import { Schema, Prop } from '@nestjs/mongoose';
import { BaseSchema, createSchema } from './base.schema';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'user',
})
export class User extends BaseSchema {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  userId: string;

  @Prop({ type: [ObjectId], ref: 'Role' })
  roles: ObjectId[];
}

export const UserSchema = createSchema(User);
export const UserModelName = User.name;
export type UserModel = Model<User>;

export const UserDestination = {
  name: UserModelName,
  schema: UserSchema,
};
