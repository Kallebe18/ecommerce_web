import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

export const ResponseInterceptor = () => {
  const { logout } = useAuth();

  useEffect(() => {
    let interceptor = api.interceptors.response.use(
      undefined,
      async (error) => {
        let errorMessage =
          "Parece que nossos servidores estão fora do ar tente novamente mais tarde.";
        if (axios.isAxiosError(error)) {
          const status = error?.response?.status;
          const apiMessage = error?.response?.data?.message;
          const route = error?.response?.config.url;

          switch (status) {
            case 401:
              if (!route?.includes("login")) {
                errorMessage = "Acesso expirado";
                logout();
              } else {
                errorMessage = "Credenciais inválidas!";
              }
              break;
            case 429:
              errorMessage =
                "Você realizou muitas requisições, espere um pouco para tentar novamente.";
              break;
            default:
              if (apiMessage) {
                errorMessage = apiMessage;
              }
          }
        }

        toast.remove();
        toast.error(errorMessage);
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  return null;
};
