import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LogInDto } from './dto/login-auth.dto';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(createAuthDto: CreateAuthDto) {
    const { fullName, username, email, password } = createAuthDto;
    const existingUserEmail = await this.userModel.findOne({ email });
    const existingUsername = await this.userModel.findOne({ username });

    if (existingUserEmail)
      throw new ConflictException('Email is already registered.');
    if (existingUsername)
      throw new ConflictException('Username is already taken.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      fullName,
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const user = savedUser.toObject();
    delete user.password;
    return user;
  }

  async logIn(logInDto: LogInDto) {
    const { email, password } = logInDto;

    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid email or password.');

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      throw new UnauthorizedException('Invalid email or password.');

    const token = await this.jwtService.signAsync({
      sub: user.id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      profileImg: user.profilePicture,
    });

    return { token };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
