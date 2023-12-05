import { Passports } from "@app/common/presentations/enums/passport.enum";

export enum Gender {
  M = 'M',
  F = 'F',
}

export enum UserRoles {
  admin = 'admin',
  user = 'user',
}

export interface CreateUserProps {
  name: string;
  email: string;
  type: Passports;
  age: number;
  phone: string;
  hash: string;
  gender: Gender;
}

export interface UserProps extends CreateUserProps {
  role: UserRoles;
}
