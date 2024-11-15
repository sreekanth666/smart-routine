export type UserType = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};

export type UserWithoutIdType = Omit<UserType, "id">;
