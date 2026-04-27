type InterestsListResponse = {
  success?: boolean;
  message?: string;
  data?: InterestsItem[];
};

type InterestsItem = {
  id?: string;
  name?: string;
  icon_url?: null;
  is_active?: boolean;
  created_at?: Date;
};

type SetInterestsResponse = {
  success?: boolean;
  message?: string;
  data?: UserInterestsItem[];
};

type UserInterestsItem = {
  id?: string;
  user_id?: string;
  interest_id?: string;
  created_at?: Date;
};

type UserInterestsResponse = {
  success?: boolean;
  message?: string;
  data?: UserInterests[];
};

type UserInterests = {
  id?: string;
  interest_id?: string;
  created_at?: Date;
  interests?: Interests;
};

type Interests = {
  id?: string;
  name?: string;
  icon_url?: null;
};

type UsersErrorResponse = {
  message: string;
  errors: ErrorResponse[];
  status: boolean;
};

type ErrorResponse = {
  field?: string;
  message?: string;
};
