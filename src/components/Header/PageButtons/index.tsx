import { Button } from "@chakra-ui/react";
import { FiHome, FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

interface PageButtonsProps {
  isFullWidth?: boolean;
}

export function PageButtons({ isFullWidth = false }: PageButtonsProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToOrders = () => {
    navigate("/orders");
  };

  return (
    <>
      <Button
        onClick={navigateToHome}
        variant="ghost"
        isFullWidth={isFullWidth}
        leftIcon={<FiHome />}
      >
        Home
      </Button>
      {!!user && (
        <Button
          onClick={navigateToOrders}
          variant="ghost"
          isFullWidth={isFullWidth}
          leftIcon={<FiList />}
        >
          Meus Pedidos
        </Button>
      )}
    </>
  );
}
