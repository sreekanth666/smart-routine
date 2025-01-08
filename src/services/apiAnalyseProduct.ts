import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { readLocalStorageValue } from "@mantine/hooks";
import { LoginServerDataType } from "../types/LoginServerDataType";

export type AnalyseProductParams = {
  image: File;
};

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/analyse-product`,
});

export async function analyseProduct({ image }: AnalyseProductParams) {
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
  formData.append("image", image);

  const response = await axiosInstance.post("", formData, config);

  return response.data;
}
