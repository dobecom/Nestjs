import { UsersEntity } from '../entities/users.entity';

export class Users extends UsersEntity {
  static readonly keyAt = 'members:at:';
  // static readonly keyRt = 'members:rt:';
  // static readonly keySess = 'members:session:';
  // static readonly keyExpire = 'members:expire:';
  // static readonly keyVerify = 'members:verify:';
  static readonly tokenSplit = '||';
  //
}
