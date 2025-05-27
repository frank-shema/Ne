// context/AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import {
  fakeLogin,
  fakeRegister,
  fakeLogout,
  getLoggedInUser,
} from "../api/fakeAuthApi";
import { User, Credentials } from "../types";

interface AuthContextType {
  user: User | null;
  login: (
    credentials: Pick<Credentials, "identifier" | "password">
  ) => Promise<User>;
  register: (credentials: Credentials) => Promise<User>;
  logout: () => Promise<void>;
  isLoading: boolean; // Initial auth check loading
  authActionLoading: boolean; // Loading for login/register actions
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authActionLoading, setAuthActionLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setIsLoading(true);
      try {
        const loggedInUser = await getLoggedInUser();
        setUser(loggedInUser);
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (
    credentials: Pick<Credentials, "identifier" | "password">
  ) => {
    setAuthActionLoading(true);
    try {
      const userData = await fakeLogin(credentials);
      setUser(userData);
      return userData;
    } catch (error) {
      throw error; // Re-throw for the component to handle
    } finally {
      setAuthActionLoading(false);
    }
  };

  const register = async (credentials: Credentials) => {
    setAuthActionLoading(true);
    try {
      const userData = await fakeRegister(credentials);
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    } finally {
      setAuthActionLoading(false);
    }
  };

  const logout = async () => {
    setAuthActionLoading(true);
    try {
      await fakeLogout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally handle logout error display
    } finally {
      setAuthActionLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isLoading, authActionLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
