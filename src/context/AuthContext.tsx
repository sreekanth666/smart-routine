import { readLocalStorageValue, useLocalStorage } from "@mantine/hooks";
import { createContext, ReactElement, useContext } from "react";
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
  });
  const isLoggedIn = value !== null;
  const authStorageValue: string | undefined = readLocalStorageValue({
    key: "loginData",
  });
  const authValue: LoginServerDataType | null = authStorageValue
    ? JSON.parse(authStorageValue)
    : null;
  const isAdmin = isLoggedIn && authValue !== null && authValue?.isAdmin;

  const login = (accessToken: string, isAdmin: boolean) => {
    setValue(JSON.stringify({ accessToken, isAdmin }));
  };

  const logout = () => {
    removeValue();
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

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
