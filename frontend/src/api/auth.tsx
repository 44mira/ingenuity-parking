import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { login_user, logout_user } from "./queries";

export interface LoginForm {
  username: string;
  password: string;
}

interface AuthContextType {
  user: string;
  login: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string>(
    () => localStorage.getItem("token") ?? "",
  );

  const login = async (user: LoginForm) => {
    const token: any = await login_user(user);
    localStorage.setItem("token", token);
    setUser(token);
  };

  const logout = async () => {
    await logout_user();
    localStorage.removeItem("token");
    setUser("");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
