import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { readLocalStorageValue } from "@mantine/hooks";
import { LoginServerDataType } from "../types/LoginServerDataType";

export type CreateDailyActivityParams = {
  title: string;
  description: string;
};

export type UpdateDailyActivityParams = Partial<CreateDailyActivityParams> & {
  id: string;
};

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/daily-activity`,
});

export async function getDailyActivity(id: string) {
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

export async function getUserDailyActivity() {
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

  const response = await axiosInstance.get("/user/all", config);

  return response.data;
}

export async function getAllDailyAcitivities() {
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

export async function createDailyActivity({
  title,
  description,
}: CreateDailyActivityParams) {
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

  const response = await axiosInstance.post("", { title, description }, config);

  return response.data;
}

export async function updateDailyActivity({
  id,
  title,
  description,
}: UpdateDailyActivityParams) {
  if (!title && !description) {
    throw new Error("No valid data to update");
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

  const newDailyActivity: Omit<UpdateDailyActivityParams, "id"> = {};

  if (title) newDailyActivity.title = title;
  if (description) newDailyActivity.description = description;

  const response = await axiosInstance.patch(
    `/${id}`,
    newDailyActivity,
    config
  );

  return response;
}

export async function deleteDailyActivity(id: string) {
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
  const response = await axiosInstance.delete(`/${id}`, config);

  return response;
}
