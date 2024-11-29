import { Injectable } from '@nestjs/common';
import { request, RequestOptions } from 'http';
import { Observable } from 'rxjs';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Injectable()
export class HttpService {
  request(options: RequestOptions, postData?: any): Observable<any> {
    return new Observable((subscriber) => {
      try {
        console.log(
          `Request started: ${options.hostname}:${options.port}${options.path}`
        );

        const apiReq = request(options, (apiRes) => {
          apiRes.setEncoding('utf8');

          apiRes.on('data', (chunk) => {
            console.log('Response chunk:', chunk);
            subscriber.next({ data: chunk.toString() });
          });

          apiRes.on('end', () => {
            console.log('Request completed.');
            subscriber.complete();
          });

          apiRes.on('error', (error) => {
            console.error(`Response error: ${error.message}`);
            subscriber.error(`Response error: ${error.message}`);
          });
        });

        apiReq.on('error', (error) => {
          console.log(error);
          console.error(`Request error: ${error.message}`);
          subscriber.error(`Request error: ${error.message}`);
        });

        // 타임아웃 설정 (예: 10초)
        apiReq.setTimeout(300000, () => {
          console.error('Request timeout');
          apiReq.destroy(); // 요청을 강제로 종료
          subscriber.error('Request timeout');
        });

        if (postData) {
          apiReq.write(postData);
        }

        apiReq.end();

        return () => {
          console.log('Request destroyed');
          apiReq.destroy();
        };
      } catch (err) {
        console.error(`HttpService Error: ${err.message}`);
        subscriber.error(`Unexpected error: ${err.message}`);
      }
    });
  }
}
