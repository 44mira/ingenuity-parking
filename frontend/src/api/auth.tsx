import { createContext, useContext, useState, type Context } from "react";
import type { ReactNode } from "react";
import { login_user, logout_user } from "./queries";

const AuthContext = createContext(null);

export interface LoginForm {
  username: string;
  password: string;
}

interface AuthContextType {
  user: string;
  login: (user: any) => void;
  logout: () => void;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const login = async (user: LoginForm) => {
    const token = await login_user(user);
    localStorage.setItem("token", token);
    setUser(token);
  };

  const logout = async () => {
    await logout_user();
    localStorage.removeItem("token");
    setUser(null);
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
