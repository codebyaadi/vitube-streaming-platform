import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signUp: jest.fn(),
    logIn: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const dto = {
        fullName: 'Test User',
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      };
      const result = { ...dto, password: undefined };

      mockAuthService.signUp.mockResolvedValue(result);
      expect(await controller.signUp(dto)).toBe(result);
      expect(service.signUp).toHaveBeenCalledWith(dto);
    });
  });

  describe('logIn', () => {
    it('should return token on successful login', async () => {
      const dto = { email: 'test@example.com', password: 'password123' };
      const result = { token: 'jwt_token' };

      mockAuthService.logIn.mockResolvedValue(result);
      expect(await controller.logIn(dto)).toBe(result);
      expect(service.logIn).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all auth records', async () => {
      const result = 'This action returns all auth';
      mockAuthService.findAll.mockReturnValue(result);
      expect(controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one auth record', async () => {
      const result = 'This action returns a #1 auth';
      mockAuthService.findOne.mockReturnValue(result);
      expect(controller.findOne('1')).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update auth record', async () => {
      const dto = { fullName: 'Updated User' };
      const result = 'This action updates a #1 auth';
      mockAuthService.update.mockReturnValue(result);
      expect(controller.update('1', dto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove auth record', async () => {
      const result = 'This action removes a #1 auth';
      mockAuthService.remove.mockReturnValue(result);
      expect(controller.remove('1')).toBe(result);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
