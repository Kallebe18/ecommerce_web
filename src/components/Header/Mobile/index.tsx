import {
  CloseButton,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { ActionButtons } from "../ActionButtons";
import { PageButtons } from "../PageButtons";

export function MobileHeader() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();

  return (
    <>
      <Flex
        flex={1}
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <IconButton
          aria-label="Open menu"
          fontSize="20px"
          variant="ghost"
          icon={<FiMenu />}
          onClick={mobileNav.onOpen}
        />

        <ActionButtons />
      </Flex>

      {/** THIS VSTACK WILL BE LOADED
       * ONLY IF MOBILE HEADER MENU IS OPEN
       */}
      <VStack
        pos="absolute"
        display={mobileNav.isOpen ? "flex" : "none"}
        zIndex={1}
        top={0}
        left={0}
        right={0}
        p={2}
        flexDirection="column"
        spacing={1}
        shadow="md"
        bg={bg}
      >
        <CloseButton
          w="full"
          h={"40px"}
          aria-label="Close menu"
          justifySelf="self-start"
          onClick={mobileNav.onClose}
        />
        <PageButtons isFullWidth />
      </VStack>
    </>
  );
}
