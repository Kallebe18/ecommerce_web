/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { api } from "../services/api";
import { getAccessToken, setAccessToken } from "../utils/localStorage";

export type User = {
  id: string;
  email: string;
};

interface LoginCredentials {
  email: string;
  password: string;
}

type AuthContextDTO = {
  user: User | null;
  setUser: (user: User) => void;
  login: (data: LoginCredentials) => Promise<void>;
  logout: (message?: string) => void;
};

const AuthContext = createContext({} as AuthContextDTO);

export function AuthProvider({ children }: PropsWithChildren<any>) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshToken();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const login = async (inputData: LoginCredentials) => {
    try {
      const { data } = await api.post("/auth/admin/login", inputData);
      setAccessToken(data.access_token);
      setUser({
        id: data.id,
        email: data.email,
      });
      navigate("/", { replace: true });
      toast.success("Logado com sucesso!");
    } catch {}
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const refreshToken = async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        logout();
        return;
      }
      const { data } = await api.post("/auth/refresh");
      setAccessToken(data.access_token);
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
