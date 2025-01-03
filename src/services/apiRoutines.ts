import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { LoginServerDataType } from "../types/LoginServerDataType";
import { readLocalStorageValue } from "@mantine/hooks";

export type CreateNewRoutineParams = {
  name: string;
  description: string;
  time: string;
  images: File[];
};

export type UpdateRoutineParams = Partial<CreateNewRoutineParams> & {
  id: string;
};

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/routine`,
});

const axiosMultipartInstance = axios.create({
  baseURL: `${BASE_URL}/routine`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export async function getUserRoutines() {
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

export async function createNewRoutine({
  name,
  description,
  time,
  images,
}: CreateNewRoutineParams) {
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

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("time", time);
  images.forEach((item) => formData.append("image", item));

  const response = await axiosMultipartInstance.post("", formData, config);

  return response.data;
}

export async function getRoutine(id: string) {
  if (id.length === 0) throw new Error("Invalid id");

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

export async function updateRoutine({
  id,
  name,
  description,
  time,
  images,
}: UpdateRoutineParams) {
  if (!name && !description && !time && !images) {
    throw new Error("No values given to update");
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

  const formData = new FormData();
  if (name) formData.append("name", name);
  if (description) formData.append("description", description);
  if (time) formData.append("time", time);
  if (images) images.forEach((item) => formData.append("image", item));

  const response = await axiosMultipartInstance.patch(
    `/${id}`,
    formData,
    config
  );

  return response.data;
}

export async function deleteRoutine(id: string) {
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

  return response.data;
}
