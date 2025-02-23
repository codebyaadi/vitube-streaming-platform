import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type VideoDocument = HydratedDocument<Video>;

@Schema({ timestamps: true, collection: 'Videos' })
export class Video {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
  })
  videoUrl: string;

  @Prop({
    type: String,
  })
  thumbnailUrl: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  })
  owner: User;

  @Prop({
    type: Number,
    default: 0,
  })
  views: number;

  @Prop({
    type: Number,
    default: 0,
  })
  likes: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
