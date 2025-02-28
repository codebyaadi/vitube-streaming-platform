import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'Users' })
export class User {
  @Prop({
    type: String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({
    type: String,
    default:
      'https://res.cloudinary.com/dqcejxdbf/image/upload/v1697359687/ue9ebtgk0csombrozfqn.jpg',
  })
  profilePicture: string;

  @Prop({ type: Boolean, default: false })
  isEmailVerified: boolean;

  @Prop()
  emailVerificationToken?: string;

  @Prop()
  emailVerificationTokenExpires?: Date;

  @Prop()
  passwordResetToken?: string;

  @Prop()
  passwordResetTokenExpires?: Date;

  @Prop({ default: 0 })
  loginAttempts: number;

  @Prop()
  lockUntil?: Date;

  @Prop({ type: Date, default: Date.now })
  lastLogin: Date;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
