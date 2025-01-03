import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { RegisterParams } from "./apiAuth";

export type UpdateUserParams = Partial<RegisterParams> & {
  id: string;
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
  password,
}: UpdateUserParams) {
  const data: Partial<RegisterParams> = {};
  if (email) data.email = email;
  if (fullName) data.fullName = fullName;
  if (phone) data.phone = phone;
  if (password) data.password = password;

  const response = await axiosInstance.patch(`/${id}`, data);

  return response;
}

export async function deleteUser(id: string) {
  const response = await axiosInstance.delete(`${id}`);

  return response;
}
