export interface User {
  username: string;
  password: string;
  isAdmin: boolean;
  name: string;
}

export const users: User[] = [
  {
    username: 'user',
    password: '1234',
    isAdmin: false,
    name: 'John Regular',
  },
  {
    username: 'admin',
    password: '5678',
    isAdmin: true,
    name: 'Jack Admin',
  },
];
