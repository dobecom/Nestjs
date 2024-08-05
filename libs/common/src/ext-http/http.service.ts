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
      const apiReq = request(options, (apiRes) => {
        apiRes.setEncoding('utf8');

        apiRes.on('data', (chunk) => {
          console.log('Response chunk:', chunk);
          subscriber.next({ data: chunk.toString() });
        });

        apiRes.on('end', () => {
          subscriber.complete();
        });

        apiRes.on('error', (e) => {
          console.error(`Problem with request: ${e.message}`);
          subscriber.error(`Problem with request: ${e.message}`);
        });
      });

      if (postData) {
        apiReq.write(postData);
      }

      apiReq.end();

      return () => {
        apiReq.destroy();
      };
    });
  }
}
