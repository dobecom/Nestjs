import { ExceptionResponse } from '@app/common/constants/exception-response.constant';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestContextService } from '../common/context/app-request.context';

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
