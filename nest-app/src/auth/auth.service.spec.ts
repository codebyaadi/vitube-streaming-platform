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
    save: jest.fn(),
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
      fullName: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    it.skip('should create a new user successfully', async () => {
      mockUserModel.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);

      const hashedPassword = 'hashedPassword';
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);

      const savedUser = {
        ...signUpDto,
        password: hashedPassword,
        toObject: () => ({
          ...signUpDto,
          password: hashedPassword,
        }),
      };

      mockUserModel.save = jest.fn().mockResolvedValue(savedUser);

      const result = await service.signUp(signUpDto);

      expect(result).toEqual({
        fullName: signUpDto.fullName,
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
      fullName: 'Test User',
      email: loginDto.email,
      username: 'testuser',
      password: 'hashedPassword',
      profilePicture: 'profile.jpg',
    };

    it('should login successfully and return token', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      mockJwtService.signAsync.mockResolvedValue('jwt_token');

      const result = await service.logIn(loginDto);

      expect(result).toEqual({ token: 'jwt_token' });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDto.password,
        mockUser.password,
      );
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUser.id,
        fullName: mockUser.fullName,
        email: mockUser.email,
        username: mockUser.username,
        profileImg: mockUser.profilePicture,
      });
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
