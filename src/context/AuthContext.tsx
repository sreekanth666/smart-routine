/* eslint-disable react-refresh/only-export-components */
import { readLocalStorageValue, useLocalStorage } from "@mantine/hooks";
import { createContext, ReactElement, useContext, useState } from "react";
import { LoginServerDataType } from "../types/LoginServerDataType";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (accessToken: string, isAdmin: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactElement;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [value, setValue, removeValue] = useLocalStorage<string | null>({
    key: "loginData",
    defaultValue: null,
    getInitialValueInEffect: false,
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => value !== null);

  const authStorageValue: string | undefined = readLocalStorageValue({
    key: "loginData",
  });

  const authValue: LoginServerDataType | null = authStorageValue
    ? JSON.parse(authStorageValue)
    : null;

  const isAdmin = isLoggedIn && authValue !== null && authValue?.isAdmin;

  const login = (accessToken: string, isAdmin: boolean) => {
    setValue(JSON.stringify({ accessToken, isAdmin }));
    setIsLoggedIn(true);
  };

  const logout = () => {
    removeValue();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
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
