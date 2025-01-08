/* eslint-disable react-refresh/only-export-components */
import { readLocalStorageValue, useLocalStorage } from "@mantine/hooks";
import { createContext, ReactElement, useContext, useState } from "react";
import { LoginServerDataType } from "../types/LoginServerDataType";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userName: string;
  userId: string;
  login: (
    token: string,
    email: string,
    id: string,
    name: string,
    isAdmin: boolean
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactElement;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [value, setValue, removeValue] = useLocalStorage<string | null>({
    key: "smart-routine-auth-data",
    defaultValue: null,
    getInitialValueInEffect: false,
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => value !== null);

  const authStorageValue: string | undefined = readLocalStorageValue({
    key: "smart-routine-auth-data",
  });

  const authValue: LoginServerDataType | null = authStorageValue
    ? JSON.parse(authStorageValue)
    : null;

  const isAdmin = isLoggedIn && authValue !== null && authValue?.isAdmin;
  const userName: string =
    isLoggedIn && authValue !== null ? authValue?.name : "";
  const userId: string = isLoggedIn && authValue !== null ? authValue?.id : "";

  const login = (
    token: string,
    email: string,
    id: string,
    name: string,
    isAdmin: boolean
  ) => {
    setValue(JSON.stringify({ token, email, id, name, isAdmin }));
    setIsLoggedIn(true);
  };

  const logout = () => {
    removeValue();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, userName, login, logout, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext was used outside of AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
