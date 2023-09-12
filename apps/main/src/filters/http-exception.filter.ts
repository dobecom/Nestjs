import { ExceptionResponse } from '@app/common/constants/exception-response.constant';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('http exception filter')
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
    };
    console.error(`Exception occured [${data.statusCode}] : ${JSON.stringify(data)}`);
    return response.status(status).json(data);
  }
}
