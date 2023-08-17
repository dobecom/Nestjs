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
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse();
    const result = {};

    if (result['errorCode']) {
      exceptionResponse['errorCode'] = result['errorCode'];
    } else {
      exceptionResponse['errorCode'] = 'Unhandled Error';
    }
    exceptionResponse['message'] = result['message'];

    response.json(result);
  }
}
