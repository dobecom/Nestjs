import { ExceptionResponse } from '@app/common/presentations/interfaces/exception-response.interface';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ClsService } from 'nestjs-cls';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private cls: ClsService) {}
  private readonly logger: Logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ExceptionResponse;

    const errorCode = exceptionResponse
      ? exceptionResponse.errorCode
      : 'Unhandled Error';
    const data = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: host.switchToHttp().getRequest().url,
      errorCode,
      message: exceptionResponse ? exceptionResponse.message : 'message',
      requestId: this.cls.get('requestId'),
    };
    this.logger.error(
      `Exception occured [${data.statusCode}] : ${JSON.stringify(data)}`
    );
    return response.status(status).json(data);
  }
}
