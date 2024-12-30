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

type UpdateTravelEstimationParams = Partial<
  Omit<CreateTravelEstimationParams, "authToken">
> & {
  id: string;
};

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/travel-estimation`,
});

export async function getTravelEstimation(id: string) {
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

  const response = await axiosInstance.get("/user/all", config);

  return response.data;
}

export async function getAllTravelEstimation() {
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
    "",
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
  if (!starting && !destination && !distance && !duration && !commutation) {
    throw new Error("No parameters specified.");
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

  const newTravelEstimation: Omit<UpdateTravelEstimationParams, "id"> = {};

  if (starting !== undefined) newTravelEstimation.starting = starting;
  if (destination !== undefined) newTravelEstimation.destination = destination;
  if (distance !== undefined) newTravelEstimation.distance = distance;
  if (duration !== undefined) newTravelEstimation.duration = duration;
  if (commutation !== undefined) newTravelEstimation.commutation = commutation;

  const response = await axiosInstance.patch(
    `/${id}`,
    newTravelEstimation,
    config
  );

  return response;
}

export async function deleteTravelEstimation(id: string) {
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
