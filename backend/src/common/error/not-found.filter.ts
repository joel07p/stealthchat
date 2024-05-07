    import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, NotFoundException } from '@nestjs/common';
    import { Request, Response } from 'express';

    @Catch(NotFoundException)
    export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception.getStatus();
        const message = exception.message;

        response
        .status(HttpStatus.NOT_FOUND)
        .json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: `Resource not found: ${message}`,
        });
    }
    }
