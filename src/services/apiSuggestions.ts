import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { readLocalStorageValue } from "@mantine/hooks";
import { LoginServerDataType } from "../types/LoginServerDataType";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/suggestions`,
});

export async function getMentalHealthSuggestions() {
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

  const response = await axiosInstance.get("/mental-health", config);

  return response.data;
}

export async function getPersonalisedSuggestions() {
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

  const response = await axiosInstance.get("/personalised", config);

  return response.data;
}
