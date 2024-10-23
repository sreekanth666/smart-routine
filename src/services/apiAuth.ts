import { LoginServerDataType } from "../types/LoginServerDataType";

type RegisterParams = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

type LoginParams = {
  email: string;
  password: string;
};

export async function register({
  fullName,
  email,
  phone,
  password,
}: RegisterParams): Promise<LoginServerDataType> {
  setTimeout(() => {
    console.log({ fullName, email, phone, password });
  }, 2000);

  return { accessToken: "xxxx.xxxx.xxxx", isAdmin: false };
}

export async function login({
  email,
  password,
}: LoginParams): Promise<LoginServerDataType> {
  let isAdmin: boolean;
  setTimeout(() => {
    console.log({ email, password });
  }, 2000);

  if (email === "admin@email.com") {
    isAdmin = true;
  } else {
    isAdmin = false;
  }

  return { accessToken: "xxxx.xxxx.xxxx", isAdmin: isAdmin };
}
