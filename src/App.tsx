import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

import { ResponseInterceptor } from "./components/ResponseInterceptor";
import { AuthProvider } from "./hooks/useAuth";
import { CartProvider } from "./hooks/useCart";
import { AppRoutes } from "./routes";
import { theme } from "./theme";
import "./validations";

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ChakraProvider theme={theme}>
          <AppRoutes />
          <Toaster />
          <ResponseInterceptor />
        </ChakraProvider>
      </CartProvider>
    </AuthProvider>
  );
}
