import { HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { HeaderCart } from "../Cart";

export function ActionButtons() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigateToProfile = () => {
    if (!user) {
      return navigate("/login");
    }
    navigate("/profile");
  };

  return (
    <HStack>
      <IconButton
        onClick={toggleColorMode}
        aria-label="Change color mode"
        fontSize={20}
        icon={colorMode === "light" ? <FiSun /> : <FiMoon />}
      />
      <HeaderCart />
      <IconButton
        onClick={handleNavigateToProfile}
        borderRadius="50%"
        aria-label="Profile"
        fontSize={20}
        icon={<FiUser />}
      />
    </HStack>
  );
}
