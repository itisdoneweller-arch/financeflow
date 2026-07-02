export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin' | 'moderator' | 'creator';
  createdAt: Date;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
