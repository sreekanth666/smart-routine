import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { readLocalStorageValue } from "@mantine/hooks";
import { LoginServerDataType } from "../types/LoginServerDataType";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function getCommunityPost(id: string) {
  const response = await axiosInstance.get(`/community/${id}`);

  return response.data;
}

export async function getUserCommunityPosts() {
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

  const response = await axiosInstance.get("/community/user/all", config);

  return response.data;
}

export async function getAllCommunityPosts() {
  const response = await axiosInstance.get("/community");

  return response.data;
}
