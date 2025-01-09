import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { readLocalStorageValue } from "@mantine/hooks";
import { LoginServerDataType } from "../types/LoginServerDataType";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/track-diet`,
});

export async function trackDietChat(prompt: string) {
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

  const response = axiosInstance.post("/chat", { prompt }, config);

  return response;
}
