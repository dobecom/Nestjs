export enum Gender {
  M = 'M',
  F = 'F',
}

export enum UserRoles {
  admin = 'admin',
  user = 'user',
}

export interface UserProps {
  role: UserRoles;
  name: string;
  email: string;
}

export interface CreateUserProps {
  name: string;
  email: string;
}
