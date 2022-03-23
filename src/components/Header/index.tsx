import { chakra } from "@chakra-ui/react";

import { DesktopHeader } from "./Desktop";
import { MobileHeader } from "./Mobile";

export function Header() {
  return (
    <chakra.header w="full" p={4} shadow={"md"}>
      <DesktopHeader />
      <MobileHeader />
    </chakra.header>
  );
}
