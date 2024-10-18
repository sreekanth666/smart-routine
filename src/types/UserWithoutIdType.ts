import { UserType } from "./UserType";

export type UserWithoutIdType = Omit<UserType, "id">;
