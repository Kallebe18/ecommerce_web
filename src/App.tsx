import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

import { ResponseInterceptor } from "./components/ResponseInterceptor";
import { AuthProvider } from "./hooks/useAuth";
import { AppRoutes } from "./routes";
import { theme } from "./theme";

export function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <AppRoutes />
        <Toaster />
        <ResponseInterceptor />
      </ChakraProvider>
    </AuthProvider>
  );
}
