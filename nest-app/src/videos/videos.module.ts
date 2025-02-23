import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from 'src/schemas/video.schema';
import { SharedModule } from 'src/shared/shared.module';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
      { name: User.name, schema: UserSchema },
    ]),
    SharedModule,
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
