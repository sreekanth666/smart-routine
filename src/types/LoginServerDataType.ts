export type UserAuthDataType = {
  email: string;
  name: string;
  isAdmin: boolean;
  id: string;
};

export type LoginServerDataType = {
  token: string;
} & UserAuthDataType;

export type LoginContextData = LoginServerDataType | null;
