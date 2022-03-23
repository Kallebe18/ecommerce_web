import {
  Button,
  Center,
  Heading,
  Text,
  UnorderedList,
  Box,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { api } from "../../services/api";
import { formatNumberToBRL } from "../../utils";
import { CartItem } from "./components/CartItem";

export function Cart() {
  const { products, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleMakeOrder = async () => {
    if (!user) {
      return navigate("/login");
    }

    const orderProducts = products.map((product) => ({
      id: product.id,
      amount: product.amount,
    }));

    await Swal.fire({
      title: "Atenção",
      text: "Tem certeza que deseja finalizar o pedido?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim",
      confirmButtonColor: "green",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await api.post("orders/create", {
            products: orderProducts,
          });
          clearCart();
          toast.success("Pedido realizado com sucesso.");
          navigate("/orders");
        } catch {}
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  if (!products.length) {
    return (
      <Center p={20}>
        <Heading as="h6" variant="h6">
          Sem produtos no carrinho :(
        </Heading>
      </Center>
    );
  }

  return (
    <Box pb={5} flexDirection="column">
      <Heading textAlign="center" mb={8} mt={5} as="h6" variant="h6">
        Meu carrinho
      </Heading>
      <Text mb={15} ml={5}>
        <Text as="span" fontWeight="bold">
          Total:{" "}
        </Text>
        {formatNumberToBRL(total)}
      </Text>
      <UnorderedList m={0}>
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </UnorderedList>
      <Button ml={5} mt={10} onClick={handleMakeOrder}>
        Finalizar Pedido
      </Button>
    </Box>
  );
}
