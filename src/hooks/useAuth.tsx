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
  username: string;
  email: string;
};

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

type AuthContextDTO = {
  user?: User;
  setUser: (user: User) => void;
  login: (data: LoginCredentials) => Promise<void>;
  register: (data: RegisterCredentials) => Promise<void>;
  logout: (message?: string) => void;
  loading: boolean;
};

const AuthContext = createContext({} as AuthContextDTO);

export function AuthProvider({ children }: PropsWithChildren<any>) {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
    const intervalId = setInterval(() => {
      refreshToken();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const login = async (inputData: LoginCredentials) => {
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", inputData);
      setAccessToken(data.access_token);
      setUser({
        id: data.id,
        username: data.username,
        email: data.email,
      });

      navigate("/", { replace: true });
      toast.success("Logado com sucesso!");
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const register = async (inputData: RegisterCredentials) => {
    try {
      setLoading(true);
      await api.post("/auth/register", inputData);
      navigate("/login");
      toast.success("Registrado com sucesso!");
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(undefined);
    if (!window.location.pathname.includes("login")) {
      navigate("/");
    }
  };

  const refreshToken = async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        return;
      }
      const { data } = await api.post("/auth/refresh");
      setAccessToken(data.access_token);
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        login,
        logout,
        setUser,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
