import { ExceptionResponse } from '@app/common/presentations/interfaces/exception-response.interface';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { RequestContextService } from 'apps/main/src/common/context/app-request.context';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ExceptionResponse;

    const errorCode = exceptionResponse.errorCode || 'Unhandled Error';

    const data = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: host.switchToHttp().getRequest().url,
      errorCode,
      message: exceptionResponse.message,
      correlationId: RequestContextService.getRequestId(),
    };
    this.logger.error(`Exception occured [${data.statusCode}] : ${JSON.stringify(data)}`);
    return response.status(status).json(data);
  }
}
