export type UserAuthDataType = {
  email: string;
  fullName: string;
  phone: string;
  isAdmin: boolean;
  id: number | string;
};

export type LoginServerDataType = {
  accessToken: string;
  user: UserAuthDataType;
};

export type LoginContextData = LoginServerDataType | null;
