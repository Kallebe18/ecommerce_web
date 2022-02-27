import {
  chakra,
  Box,
  Flex,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export function Header() {
  const bg = useColorModeValue("gray.300", "gray.800");

  const mobileNav = useDisclosure();
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/");
  };

  return (
    <chakra.header w="full" p={4} shadow={"md"}>
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <HStack display="flex" spacing={3} alignItems="center">
          <Box display={{ base: "inline-flex", md: "none" }}>
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />
            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              display={mobileNav.isOpen ? "flex" : "none"}
              flexDirection="column"
              p={2}
              pb={4}
              spacing={3}
              rounded="sm"
              shadow="md"
              bg={bg}
            >
              <CloseButton
                aria-label="Close menu"
                justifySelf="self-start"
                onClick={mobileNav.onClose}
              />
              <Button
                onClick={handleNavigateToHome}
                w="full"
                variant="ghost"
                leftIcon={<AiFillHome />}
              >
                Home
              </Button>
            </VStack>
          </Box>
          <chakra.a
            href="/"
            title="Choc Home Page"
            display="flex"
            alignItems="center"
          >
            <VisuallyHidden>Choc</VisuallyHidden>
          </chakra.a>

          <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
            <Button
              onClick={handleNavigateToHome}
              variant="ghost"
              leftIcon={<AiFillHome />}
              size="sm"
            >
              Home
            </Button>
          </HStack>
        </HStack>
      </Flex>
    </chakra.header>
  );
}
