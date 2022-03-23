import { Flex, HStack } from "@chakra-ui/react";
import { ActionButtons } from "../ActionButtons";
import { PageButtons } from "../PageButtons";

export function DesktopHeader() {
  return (
    <Flex display={{ base: "none", md: "flex" }} justify="space-between">
      <HStack>
        <PageButtons />
      </HStack>

      <ActionButtons />
    </Flex>
  );
}
