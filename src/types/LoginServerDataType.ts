export type LoginServerDataType = {
  accessToken: string;
  isAdmin: boolean;
};

export type LoginContextData = LoginServerDataType | null;
