import {
  Box,
  ListItem,
  Image,
  Heading,
  Text,
  IconButton,
  Input,
  HStack,
  Flex,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";

import { FiPlus, FiMinus, FiTrash } from "react-icons/fi";
import { CartProduct, useCart } from "../../../../hooks/useCart";
import { formatNumberToBRL } from "../../../../utils";

interface CartItemProps {
  product: CartProduct;
}

export function CartItem({ product }: CartItemProps) {
  const { decreaseProduct, increaseProduct, removeProduct } = useCart();
  const CartItemBg = useColorModeValue("#f9f9f9", "gray.800");
  const CartItemButtonBg = useColorModeValue("gray.400", "gray.800");
  const CartItemButtonExcludeBg = useColorModeValue("gray.100", "gray.800");

  return (
    <ListItem p={5} bg={CartItemBg} listStyleType="none">
      <Flex flexWrap="wrap-reverse">
        <Box
          h={200}
          w={200}
          shadow="lg"
          display="flex"
          justifyContent={"center"}
          mr={4}
          overflow={"hidden"}
          borderRadius={5}
        >
          <Image objectFit={"contain"} src={product.imageUrl} />
        </Box>
        <Flex flex={1} direction="column">
          <Heading mb="auto" as="h5" variant="h5" size="md">
            {product.name}
          </Heading>
          <Text>{product.description}</Text>
          <Text textAlign="end" mt="auto">
            {formatNumberToBRL(product.total)}
          </Text>
        </Flex>
      </Flex>
      <HStack justifyContent="flex-end" alignSelf="flex-end" mt={5}>
        <IconButton
          bg={CartItemButtonBg}
          aria-label="Increase amount"
          icon={<FiPlus />}
          onClick={() => increaseProduct(product.id)}
        />
        <Input
          isReadOnly
          textAlign="center"
          type="number"
          maxW="120px"
          value={product.amount}
        />
        <IconButton
          onClick={() => decreaseProduct(product.id)}
          bg={CartItemButtonBg}
          aria-label="Decrease amount"
          icon={<FiMinus />}
        />
        <Tooltip label="Remover Item">
          <IconButton
            onClick={() => removeProduct(product.id)}
            bg={CartItemButtonExcludeBg}
            aria-label="Decrease amount"
            icon={<FiTrash color="red" />}
          />
        </Tooltip>
      </HStack>
    </ListItem>
  );
}
