import { AccountType } from "../enums/AccountType";

export type RegisterDataType = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  accountType: AccountType;
};
