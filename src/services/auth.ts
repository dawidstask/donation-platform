import { User, users } from '@/mocks/users';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: Omit<User, 'password'>;
  message?: string;
}

export const authenticate = (credentials: LoginCredentials): AuthResponse => {
  const user = users.find(
    (u: User) => u.username === credentials.username && u.password === credentials.password,
  );

  if (user) {
    const { ...userDetails } = user;
    return {
      success: true,
      user: userDetails,
    };
  }

  return {
    success: false,
    message: 'Invalid username or password',
  };
};
