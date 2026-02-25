import { Prop, Schema } from '@nestjs/mongoose';
import { BaseSchema, createSchema } from './base.schema';
import { ROLE, PERMISSION } from '@common/constants/enum/role.enum';
import { Model } from 'mongoose';

@Schema({ timestamps: true, collection: 'role' })
export class Role extends BaseSchema {
  @Prop({ type: String, enum: ROLE, default: ROLE.ACCOUNTANT })
  name: ROLE;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [String], enum: PERMISSION, default: [] })
  permission: PERMISSION[];
}

export const RoleSchema = createSchema(Role);
export const RoleModelName = Role.name;
export type RoleModel = Model<Role>;

export const RoleDestination = {
  name: RoleModelName,
  schema: RoleSchema,
};
