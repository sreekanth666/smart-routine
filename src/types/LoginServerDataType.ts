export type LoginServerDataType = {
  accountToken: string;
  isAdmin: boolean;
};

export type LoginContextData = LoginServerDataType | null;
