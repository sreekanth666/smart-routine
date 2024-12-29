import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { readLocalStorageValue } from "@mantine/hooks";
import { LoginServerDataType } from "../types/LoginServerDataType";

export type UpdateGoalParams = {
  id: string;
  goal?: string;
  isAchieved?: boolean;
};

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/goals`,
});

export async function getGoal(id: string) {
  const response = await axiosInstance.get(`/${id}`);

  return response.data;
}

export async function getUserGoals() {
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
  const response = await axiosInstance.get("/");

  return response.data;
}

export async function addNewGoal(goal: string) {
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

  const response = await axiosInstance.post("/", { goal }, config);

  return response;
}

export async function updateGoal({ id, goal, isAchieved }: UpdateGoalParams) {
  if (!goal && !isAchieved) {
    throw new Error("No valid data to update");
  }

  let newGoal: Omit<UpdateGoalParams, "id"> = {};
  if (goal) newGoal = { goal };
  if (isAchieved) newGoal = { isAchieved };
  const response = await axiosInstance.patch(`/${id}`, newGoal);

  return response;
}

export async function deleteGoal(id: string) {
  const response = await axiosInstance.delete(`/${id}`);

  return response;
}

export async function achieveGoal(id: string) {
  const response = await axiosInstance.patch(`/achieve/${id}`);

  return response;
}
