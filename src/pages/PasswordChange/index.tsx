import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  PasswordChangeSchema,
  PasswordRecoverySchema,
} from "../../validations";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { setAccessToken } from "../../utils/localStorage";

interface PasswordChangeData {
  password: string;
  passwordConfirmation: string;
}

export function PasswordChange() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangeData>({
    resolver: yupResolver(PasswordChangeSchema),
  });

  useEffect(() => {
    const search = location.search;
    const token = new URLSearchParams(search).get("token");
    if (token) {
      setAccessToken(token);
    } else {
      toast.error("Token inválido!");
      navigate("/login");
    }
  }, []);

  const onSubmit = async ({
    password,
    passwordConfirmation,
  }: PasswordChangeData) => {
    try {
      setLoading(true);
      if (password !== passwordConfirmation) {
        toast.error("As senhas não combinam!");
        return;
      }
      await api.post("auth/change/password", {
        password,
      });
      toast.success("Senha alterada com sucesso!");
      navigate("/login");
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  console.log(errors);
  return (
    <Flex
      mt={10}
      flexDirection="column"
      flex={1}
      align={"center"}
      justify={"center"}
    >
      <Heading p={2} textAlign="center" fontSize={"3xl"}>
        Alteração de senha
      </Heading>

      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
        m={2}
        mt={5}
        maxW={500}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Nova senha</FormLabel>
              <Input
                placeholder="••••••••••"
                id="password"
                type="password"
                {...register("password")}
              />
              {!!errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.passwordConfirmation}>
              <FormLabel htmlFor="passwordConfirmation">
                Confirmar senha
              </FormLabel>
              <Input
                placeholder="••••••••••"
                id="passwordConfirmation"
                type="password"
                {...register("passwordConfirmation")}
              />
              {!!errors.passwordConfirmation && (
                <FormErrorMessage>
                  {errors.passwordConfirmation.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Link onClick={navigateToLogin} color={"blue.400"}>
                Já possui uma conta?
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
                  Enviar
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}
