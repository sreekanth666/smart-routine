import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { readLocalStorageValue } from "@mantine/hooks";
import { LoginServerDataType } from "../types/LoginServerDataType";

export type CreateDailyActivityParams = {
  title: string;
  description: string;
};

export type UpdateDailyActivityParams = CreateDailyActivityParams & {
  id: string;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function getDailyActivity(id: string) {
  const response = await axiosInstance.get(`/daily-activity/${id}`);

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

  const response = await axiosInstance.get("/daily-activity/user/all", config);

  return response.data;
}

export async function getAllDailyAcitivities() {
  const response = await axiosInstance.get("/daily-activity");

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

  const response = await axiosInstance.post(
    "/daily-activity",
    { title, description },
    config
  );

  return response.data;
}

export async function updateDailyActivity({
  id,
  title,
  description,
}: UpdateDailyActivityParams) {
  const response = await axiosInstance.patch(`/daily-activity/${id}`, {
    title,
    description,
  });

  return response;
}

export async function deleteDailyActivity(id: string) {
  const response = await axiosInstance.delete(`/daily-activity/${id}`);

  return response;
}
