import { Injectable } from '@nestjs/common';
import { interval, map, take } from 'rxjs';

@Injectable()
export class UserService {
  async signUp(data) {

      // Example for Observable continuous 5 times return
      const observable$ = interval(1000).pipe(
        take(5),
        map(index => {
          const newData = {
            status: 'done',
            index: index + 1,
          };
          return {
            ...data,
            ...newData,
          };
        })
      );
      // Observable을 구독하고 그 결과를 반환
      return await observable$;
    return `Sign Up ${JSON.stringify(data)}`;
  }
}
