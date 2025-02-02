import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { performance } from 'perf_hooks';

interface ExtendedResponse extends Response {
  locals: {
    body: any;
    requestId: string;
    startTime: number;
  };
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  private readonly SENSITIVE_HEADERS = ['authorization', 'cookie', 'x-api-key'];
  private readonly RESTRICTED_ROUTES = ['/auth'];
  private readonly MAX_BODY_LENGTH = 1000;

  use(request: Request, response: ExtendedResponse, next: NextFunction) {
    try {
      const startTime = performance.now();
      const requestId = this.generateRequestId();

      // Attach data to response locals for later use
      response.locals.requestId = requestId;
      response.locals.startTime = startTime;

      // Log request details
      this.logRequest(request, requestId);

      // Intercept response methods
      this.interceptResponse(response, request, requestId, startTime);

      // Add request ID to response headers
      response.setHeader('X-Request-ID', requestId);

      // Error handling for response
      response.on('error', (error) => {
        this.logger.error(
          `[${requestId}] Response Error: ${error.message}`,
          error.stack,
        );
      });

      next();
    } catch (error) {
      this.logger.error('Logger Middleware Error:', error);
      next(error);
    }
  }

  private generateRequestId(): string {
    return `${Date.now()}-${uuidv4()}`;
  }

  private sanitizeHeaders(headers: any): any {
    return Object.entries(headers).reduce((acc, [key, value]) => {
      acc[key] = this.SENSITIVE_HEADERS.includes(key.toLowerCase())
        ? '[REDACTED]'
        : value;
      return acc;
    }, {});
  }

  private truncateBody(body: any): any {
    if (!body) return body;

    const stringified = JSON.stringify(body);
    if (stringified.length <= this.MAX_BODY_LENGTH) return body;

    return {
      truncated: true,
      preview: stringified.substring(0, this.MAX_BODY_LENGTH) + '...',
      originalSize: stringified.length,
    };
  }

  private logRequest(request: Request, requestId: string): void {
    const { ip, method, originalUrl: url, body } = request;
    const userAgent = request.get('user-agent') || '';
    const sanitizedHeaders = this.sanitizeHeaders(request.headers);
    const truncatedBody = this.truncateBody(body);
    const isRestricted = this.RESTRICTED_ROUTES.some((route) =>
      url.includes(route),
    );

    this.logger.log({
      type: 'REQUEST',
      timestamp: new Date().toISOString(),
      requestId,
      method,
      url,
      ip,
      userAgent,
      headers: sanitizedHeaders,
      body: isRestricted ? '[REDACTED]' : truncatedBody,
    });
  }

  private interceptResponse(
    response: ExtendedResponse,
    request: Request,
    requestId: string,
    startTime: number,
  ): void {
    const originalJson = response.json.bind(response);
    const originalSend = response.send.bind(response);

    // Intercept json method
    response.json = function (...args: Parameters<typeof originalJson>) {
      response.locals.body = args[0];
      return originalJson.apply(response, args);
    };

    // Intercept send method
    response.send = function (...args: Parameters<typeof originalSend>) {
      response.locals.body = args[0];
      return originalSend.apply(response, args);
    };

    // Log response on finish
    response.on('finish', () => {
      const responseTime = performance.now() - startTime;
      const { method, originalUrl: url } = request;
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      const truncatedResponseBody = this.truncateBody(response.locals.body);
      const isRestricted = this.RESTRICTED_ROUTES.some((route) =>
        url.includes(route),
      );

      this.logger.log({
        type: 'RESPONSE',
        timestamp: new Date().toISOString(),
        requestId,
        method,
        url,
        statusCode,
        responseTime: `${Math.round(responseTime)}ms`,
        contentLength: contentLength || 0,
        body: isRestricted ? '[REDACTED]' : truncatedResponseBody,
        memoryUsage: `${process.memoryUsage().heapUsed / 1024 / 1024}MB`, // MB
      });
    });
  }
}
