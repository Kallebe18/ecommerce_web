import { Flex, Button, Heading, Avatar } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

export function Profile() {
  const { user, logout } = useAuth();

  return (
    <Flex
      justifyContent={"space-between"}
      p={5}
      flexDirection="column"
      align="center"
    >
      <Heading
        color="#666"
        mb={10}
        alignSelf="start"
        textAlign="center"
        as="h4"
      >
        Meu perfil
      </Heading>
      <Avatar size="xl" mb={3} />
      <Heading size="md" textAlign="center" as="h4">
        {user?.username}
      </Heading>
      <Button
        onClick={() => logout()}
        variant="outline"
        colorScheme="red"
        w={300}
        mt={120}
      >
        Sair
      </Button>
    </Flex>
  );
}
