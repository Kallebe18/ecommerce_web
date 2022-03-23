import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../../hooks/useAuth";
import { LoginSchema } from "../../validations";

interface LoginFormData {
  email: string;
  password: string;
}

export function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const recoverPassword = () => {
    navigate("/recover");
  };

  const passwordError = errors?.password;
  const emailError = errors?.email;
  return (
    <Flex
      mt={10}
      flexDirection="column"
      flex={1}
      align={"center"}
      justify={"center"}
    >
      <Heading textAlign="center" fontSize={"4xl"}>
        Acessar ecommerce
      </Heading>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
        mt={5}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!emailError}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                placeholder="email@gmail.com"
                id="email"
                type="email"
                {...register("email")}
              />
              {!!emailError && (
                <FormErrorMessage>{emailError.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!passwordError}>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input
                id="password"
                placeholder="••••••••••"
                type="password"
                {...register("password")}
              />
              {!!passwordError && (
                <FormErrorMessage>{passwordError.message}</FormErrorMessage>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Link onClick={recoverPassword} color={"blue.400"}>
                Esqueceu sua senha?
              </Link>
              <Stack>
                <Button
                  isLoading={loading}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Logar
                </Button>
                <Button
                  colorScheme={"blue"}
                  variant="outline"
                  onClick={navigateToRegister}
                >
                  Fazer cadastro
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}
