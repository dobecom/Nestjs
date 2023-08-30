export interface UserProps {
  role: UserRoles;
  name: string;
  email: string;
}

export enum UserRoles {
  admin = 'admin',
  user = 'user',
}

export interface CreateUserProps {
  name: string;
  email: string;
}
