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
import { RegisterSchema } from "../../validations";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function Register() {
  const { register: authRegister, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    authRegister(data);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const passwordError = errors?.password;
  const emailError = errors?.email;
  const usernameError = errors?.email;
  return (
    <Flex
      mt={10}
      flex={1}
      flexDirection="column"
      align={"center"}
      justify={"center"}
    >
      <Heading textAlign="center" fontSize={"4xl"}>
        Criar conta
      </Heading>
      <Box
        p={8}
        mt={5}
        minW={280}
        maxW={500}
        rounded={"lg"}
        boxShadow={"lg"}
        bg={useColorModeValue("white", "gray.700")}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!usernameError}>
              <FormLabel htmlFor="username">Nome de usuário</FormLabel>
              <Input id="username" type="username" {...register("username")} />
              {!!usernameError && (
                <FormErrorMessage>{usernameError.message}</FormErrorMessage>
              )}
            </FormControl>
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
                placeholder="••••••••••"
                id="password"
                type="password"
                {...register("password")}
              />
              {!!passwordError && (
                <FormErrorMessage>{passwordError.message}</FormErrorMessage>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Link onClick={navigateToLogin} color={"blue.400"}>
                Já possui uma conta?
              </Link>
              <Button
                isLoading={loading}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Registrar
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}
