import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { RegisterParams } from "./apiAuth";

export type UpdateUserParams = Partial<Omit<RegisterParams, "password">> & {
  id: string;
};

type ServerUpdateUserType = Partial<
  Omit<RegisterParams, "password" | "fullName">
> & {
  name?: string;
};

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/user`,
});

export async function getUsers() {
  const response = await axiosInstance.get("");

  return response.data;
}

export async function getUser(id: string) {
  const response = await axiosInstance.get(`/${id}`);

  return response.data;
}

export async function updateUser({
  id,
  email,
  fullName,
  phone,
}: UpdateUserParams) {
  const data: ServerUpdateUserType = {};
  if (email) data.email = email;
  if (fullName) data.name = fullName;
  if (phone) data.phone = phone;

  const response = await axiosInstance.patch(`/${id}`, data);

  return response;
}

export async function deleteUser(id: string) {
  const response = await axiosInstance.delete(`${id}`);

  return response;
}
