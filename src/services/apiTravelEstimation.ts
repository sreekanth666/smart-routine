import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { readLocalStorageValue } from "@mantine/hooks";
import { LoginServerDataType } from "../types/LoginServerDataType";

export type CreateTravelEstimationParams = {
  starting: string;
  destination: string;
  distance: string;
  duration: string;
  commutation: string;
};

type UpdateTravelEstimationParams = Omit<
  CreateTravelEstimationParams,
  "authToken"
> & {
  id: string;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function getTravelEstimation(id: string) {
  const response = await axiosInstance.get(
    `${BASE_URL}/travel-estimation/${id}`
  );

  return response;
}

export async function getUserTravelEstimation() {
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

  const response = await axiosInstance.get(
    `${BASE_URL}/travel-estimation/user/all`,
    config
  );

  return response.data;
}

export async function getAllTravelEstimation() {
  const response = await axiosInstance.get(`${BASE_URL}/travel-estimation`);

  return response;
}

export async function createTravelEstimation({
  starting,
  destination,
  distance,
  duration,
  commutation,
}: CreateTravelEstimationParams) {
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
    `${BASE_URL}/travel-estimation`,
    {
      starting,
      destination,
      distance,
      duration,
      commutation,
    },
    config
  );

  return response;
}

export async function updateTravelEstimation({
  id,
  starting,
  destination,
  distance,
  duration,
  commutation,
}: UpdateTravelEstimationParams) {
  const response = await axiosInstance.patch(
    `${BASE_URL}/travel-estimation/${id}`,
    {
      starting,
      destination,
      distance,
      duration,
      commutation,
    }
  );

  return response;
}

export async function deleteTravelEstimation(id: string) {
  const response = await axiosInstance.delete(
    `${BASE_URL}/travel-estimation/${id}`
  );

  return response;
}
