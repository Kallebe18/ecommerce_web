import { useState } from "react";

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
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { PasswordRecoverySchema } from "../../validations";
import { api } from "../../services/api";
import toast from "react-hot-toast";

interface PasswordRecoveryData {
  email: string;
}

export function PasswordRecovery() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryData>({
    resolver: yupResolver(PasswordRecoverySchema),
  });

  const onSubmit = async ({ email }: PasswordRecoveryData) => {
    try {
      setLoading(true);
      await api.post("auth/recover/password", {
        email,
      });
      toast.success("Email de recuperação enviado com sucesso!");
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const emailError = errors?.email;
  return (
    <Flex
      mt={10}
      flexDirection="column"
      flex={1}
      align={"center"}
      justify={"center"}
    >
      <Heading p={2} textAlign="center" fontSize={"3xl"}>
        Recuperar senha
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
        <Text maxW={300} mb={5} textAlign="center" mt={5}>
          Digite o email para o qual enviaremos o link de recuperação.
        </Text>
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
