import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private userCp: ClientProxy) {}

  @Post('signIn')
  signIn(@Body() req) {
    return this.userCp.send('user-signIn', req);
  }

  @Post('signUp')
  signUp(@Body() req) {
    return this.userCp.send('user-signUp', req);
  }
}

// // 방법 1. Promise resolve
// const data = await new Promise((resolve) => {
//   result
//   .pipe(
//     takeLast(1)
//   )
//   .subscribe((data: any) => {
//     resolve(data);
//   });
// });
// console.log('data');
// console.log(data);

// // 방법 2. lastValueFrom 사용
// const data2 = await lastValueFrom(result);
// console.log('data2');
// console.log(data2);
