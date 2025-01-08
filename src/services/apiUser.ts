import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { RegisterParams } from "./apiAuth";
import { LoginServerDataType } from "../types/LoginServerDataType";
import { readLocalStorageValue } from "@mantine/hooks";

export type UpdateUserParams = Partial<Omit<RegisterParams, "password">> & {
  id: string;
};

type ServerUpdateUserType = Partial<
  Omit<RegisterParams, "password" | "fullName">
> & {
  name?: string;
};

export type ResetPasswordParams = {
  oldPassword: string;
  newPassword: string;
};

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/user`,
});

export async function getUsers() {
  const authStorageValue: string | undefined = readLocalStorageValue({
    key: "smart-routine-auth-data",
  });

  const authValue: LoginServerDataType | null = authStorageValue
    ? JSON.parse(authStorageValue)
    : null;

  const authToken = authValue !== null ? authValue?.token : "";

  if (authToken.length === 0) throw new Error("Auth token not found");

  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  const response = await axiosInstance.get("", config);

  return response.data;
}

export async function getUser(id: string) {
  const authStorageValue: string | undefined = readLocalStorageValue({
    key: "smart-routine-auth-data",
  });

  const authValue: LoginServerDataType | null = authStorageValue
    ? JSON.parse(authStorageValue)
    : null;

  const authToken = authValue !== null ? authValue?.token : "";

  if (authToken.length === 0) throw new Error("Auth token not found");

  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  const response = await axiosInstance.get(`/${id}`, config);

  return response.data;
}

export async function updateUser({
  id,
  email,
  fullName,
  phone,
}: UpdateUserParams) {
  if (!email && !fullName && !phone) {
    throw new Error("At least one field must be updated");
  }

  const authStorageValue: string | undefined = readLocalStorageValue({
    key: "smart-routine-auth-data",
  });

  const authValue: LoginServerDataType | null = authStorageValue
    ? JSON.parse(authStorageValue)
    : null;

  const authToken = authValue !== null ? authValue?.token : "";

  if (authToken.length === 0) throw new Error("Auth token not found");

  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  const data: ServerUpdateUserType = {};
  if (email) data.email = email;
  if (fullName) data.name = fullName;
  if (phone) data.phone = phone;

  const response = await axiosInstance.patch(`/${id}`, data, config);

  return response;
}

export async function deleteUser(id: string) {
  const authStorageValue: string | undefined = readLocalStorageValue({
    key: "smart-routine-auth-data",
  });

  const authValue: LoginServerDataType | null = authStorageValue
    ? JSON.parse(authStorageValue)
    : null;

  const authToken = authValue !== null ? authValue?.token : "";

  if (authToken.length === 0) throw new Error("Auth token not found");

  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };

  const response = await axiosInstance.delete(`${id}`, config);

  return response;
}

export async function resetPassword({
  oldPassword,
  newPassword,
}: ResetPasswordParams) {
  const authStorageValue: string | undefined = readLocalStorageValue({
    key: "smart-routine-auth-data",
  });

  const authValue: LoginServerDataType | null = authStorageValue
    ? JSON.parse(authStorageValue)
    : null;

  const authToken = authValue !== null ? authValue?.token : "";

  if (authToken.length === 0) throw new Error("Auth token not found");

  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };

  const response = await axiosInstance.patch(
    "/reset/password",
    { oldPassword, newPassword },
    config
  );

  return response;
}
