import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException(
          'Authentication token is missing or malformed',
        );
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      const decoded = await this.jwtService.verifyAsync(token);

      if (!decoded) {
        throw new ForbiddenException('Invalid token');
      }

      req['user'] = decoded;

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      } else if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      } else {
        throw new UnauthorizedException('Authentication failed');
      }
    }
  }
}
