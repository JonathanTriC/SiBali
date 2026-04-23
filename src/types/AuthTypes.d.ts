type RegisterResponse = {
  user?: User;
  token?: string;
};

type LoginResponse = {
  user?: User;
  accessToken?: string;
};

type AuthErrorResponse = {
  field: string;
  message: string;
};

type User = {
  id?: string;
  name?: string;
  email?: string;
  created_at?: string;
};
