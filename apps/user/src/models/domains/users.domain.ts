import { UserEntity } from '../entities/user.entity';

export class Users extends UserEntity {
  static readonly keyAt = 'members:at:';
  // static readonly keyRt = 'members:rt:';
  // static readonly keySess = 'members:session:';
  // static readonly keyExpire = 'members:expire:';
  // static readonly keyVerify = 'members:verify:';
  static readonly tokenSplit = '||';
  //
}
