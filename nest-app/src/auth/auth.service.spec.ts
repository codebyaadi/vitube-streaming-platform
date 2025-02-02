import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { User } from '../schemas/user.schema';

describe('AuthService', () => {
  let service: AuthService;
  let userModel: Model<User>;
  let jwtService: JwtService;

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    const signUpDto = {
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    it('should create a new user successfully', async () => {
      // Mock the findOne calls for email and username checks
      mockUserModel.findOne
        .mockResolvedValueOnce(null) // email check
        .mockResolvedValueOnce(null); // username check

      const hashedPassword = 'hashedPassword';
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);

      const savedUser = {
        _id: 'mockId',
        ...signUpDto,
        password: hashedPassword,
        toObject: () => ({
          _id: 'mockId',
          ...signUpDto,
          password: hashedPassword,
        }),
      };

      // Mock the new user creation and save
      mockUserModel.create = jest.fn().mockImplementation(() => ({
        save: () => Promise.resolve(savedUser),
      }));

      const result = await service.signUp(signUpDto);

      expect(result).toEqual({
        _id: 'mockId',
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        username: signUpDto.username,
        email: signUpDto.email,
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(signUpDto.password, 10);
    });

    it('should throw ConflictException if email exists', async () => {
      mockUserModel.findOne.mockResolvedValueOnce({ email: signUpDto.email });

      await expect(service.signUp(signUpDto)).rejects.toThrow(
        new ConflictException('Email is already registered.'),
      );
    });

    it('should throw ConflictException if username exists', async () => {
      mockUserModel.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ username: signUpDto.username });

      await expect(service.signUp(signUpDto)).rejects.toThrow(
        new ConflictException('Username is already taken.'),
      );
    });
  });

  describe('logIn', () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser = {
      id: 'userId',
      _id: 'userId',
      firstName: 'Test',
      lastName: 'User',
      email: loginDto.email,
      username: 'testuser',
      password: 'hashedPassword',
      profilePicture: 'profile.jpg',
      toObject: function () {
        return {
          id: this.id,
          _id: this._id,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          username: this.username,
          profilePicture: this.profilePicture,
        };
      },
    };

    it('should login successfully and return user with token', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      mockJwtService.signAsync.mockResolvedValue('jwt_token');
      mockUserModel.updateOne.mockResolvedValue({ modifiedCount: 1 });

      const result = await service.logIn(loginDto);

      expect(result).toEqual({
        user: mockUser.toObject(),
        token: 'jwt_token',
      });

      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDto.password,
        mockUser.password,
      );
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUser.id,
      });
      expect(userModel.updateOne).toHaveBeenCalledWith(
        { email: loginDto.email },
        { $set: { lastLogin: expect.any(Date) } },
      );
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockUserModel.findOne.mockResolvedValue(null);

      await expect(service.logIn(loginDto)).rejects.toThrow(
        new UnauthorizedException('Invalid email or password.'),
      );
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(service.logIn(loginDto)).rejects.toThrow(
        new UnauthorizedException('Invalid email or password.'),
      );
    });
  });
});
