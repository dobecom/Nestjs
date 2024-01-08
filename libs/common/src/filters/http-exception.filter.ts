import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ClsService } from 'nestjs-cls';

interface ExceptionResponse {
  code: string;
  message: string;
  cause?: any;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private cls: ClsService) {}
  private readonly logger: Logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ExceptionResponse;
    const data = {};
    if(exceptionResponse.code) {
      data['code'] = exceptionResponse.code;
    }
    if(exceptionResponse.cause){
      data['cause'] = exceptionResponse.cause;
    }
    data['timestamp'] = new Date().getTime();
    data['requestId'] = this.cls.get('requestId');
    
    return response.status(status).json(data);
  }
}
