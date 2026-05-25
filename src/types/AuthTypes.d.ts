type RegisterResponse = {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
};

type LoginResponse = {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
};

type AuthMeResponse = {
  user: User;
};

type RefreshTokenResponse = {
  user: User;
  accessToken: string;
};

type LogoutResponse = {
  success: boolean;
  message: string;
};

type AuthErrorResponse = {
  message: string;
  errors: ErrorResponse[];
  status: boolean;
};

type ErrorResponse = {
  field?: string;
  message?: string;
};

type User = {
  id?: string;
  name?: string;
  email?: string;
  date_of_birth?: string;
  nationality?: string;
  created_at?: string;
};
