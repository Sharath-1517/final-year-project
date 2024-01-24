import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<[Admin]>;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, default: 'GENERAL_ADMIN' })
  role?: 'GENERAL_ADMIN' | 'SUPER_ADMIN' | 'OWNER';

  @Prop({ required: true })
  password: string;

  @Prop()
  access_token?: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
