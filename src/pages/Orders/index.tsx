import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Heading,
  ListItem,
  UnorderedList,
  Text,
} from "@chakra-ui/react";

import { api } from "../../services/api";
import { Order } from "../../types";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    listOrders();
  }, []);

  const listOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch {}
  };

  return (
    <Center p={5} flexDirection="column">
      <Heading mb={6} as="h6" variant="h6">
        Meus Pedidos
      </Heading>
      <UnorderedList>
        {orders.map((order) => (
          <ListItem pb={6} display="flex" listStyleType="none" key={order.id}>
            <Box>
              <Heading as="h5" variant="h5" size="md">
                Pedido {order.id}
              </Heading>
              <Text>Total - R$ {order.total}</Text>
            </Box>
          </ListItem>
        ))}
      </UnorderedList>
    </Center>
  );
}
