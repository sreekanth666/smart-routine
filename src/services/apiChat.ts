import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { readLocalStorageValue } from "@mantine/hooks";
import { LoginServerDataType } from "../types/LoginServerDataType";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/chat`,
});

export async function chatToAi(message: string) {
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

  const result = await axiosInstance.post("", { message }, config);

  return result;
}

export async function getChatMessages() {
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

export async function deleteChat() {
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

  const response = await axiosInstance.delete("", config);

  return response.data;
}
