import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video, VideoDocument } from '../schemas/video.schema';
import { S3Service } from '../shared/services/s3.service';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<Video>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private s3Service: S3Service,
  ) {}

  async create(
    createVideoDto: CreateVideoDto,
    file: Express.Multer.File,
    userId: string,
  ): Promise<VideoDocument> {
    if (!file) {
      throw new BadRequestException('No video file provided');
    }

    try {
      const videoKey = this.s3Service.generateKey(
        'videos',
        file.originalname,
        userId,
      );

      await this.s3Service.uploadFile(file.buffer, videoKey, file.mimetype);

      const video = new this.videoModel({
        ...createVideoDto,
        owner: userId,
        videoUrl: videoKey,
      });

      return video.save();
    } catch (error) {
      throw new BadRequestException(`Failed to upload video: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const videos = await this.videoModel
        .find()
        .populate({
          path: 'owner',
          model: this.userModel,
          select: 'username',
        })
        .exec();

      const videosWithUrl = await Promise.all(
        videos.map(async (video) => {
          const url = await this.s3Service.getSignedUrl(video.videoUrl);
          return { ...video.toObject(), videoUrl: url };
        }),
      );
      return videosWithUrl;
    } catch (error) {
      throw new BadRequestException(`Failed to fetch videos: ${error.message}`);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
