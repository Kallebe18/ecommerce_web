import {
  Box,
  IconButton,
  Badge,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Menu,
  Flex,
  chakra,
  Text,
} from "@chakra-ui/react";
import { FiShoppingCart, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";

export function HeaderCart() {
  const { products, removeProduct } = useCart();
  const navigate = useNavigate();

  const handleOpenCart = () => {
    navigate("cart");
  };

  const handleRemoveProduct = (id: string) => {
    removeProduct(id);
  };

  return (
    <Box position="relative" p={0} m={0}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="My cart"
          icon={<FiShoppingCart />}
          outline="none"
        />
        {!!products.length && (
          <MenuList p={0}>
            {products.map((product) => (
              <MenuItem
                closeOnSelect={false}
                p={3}
                pr={0}
                cursor="default"
                borderBottom="1px solid black"
                key={product.id}
              >
                <Image
                  boxSize="2rem"
                  fit="contain"
                  borderRadius={10}
                  src={product.imageUrl}
                  alt={product.name}
                  mr="12px"
                />
                <Flex
                  flex={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <chakra.span mr={3}>{product.name}</chakra.span>
                  <chakra.span mr={3}>x{product.amount}</chakra.span>
                  <Box
                    aria-label="Delete item"
                    color="red"
                    cursor="pointer"
                    p={3}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveProduct(product.id);
                    }}
                  >
                    <FiTrash />
                  </Box>
                </Flex>
              </MenuItem>
            ))}
            <MenuItem
              fontWeight="bold"
              textAlign="center"
              onClick={handleOpenCart}
              justifyContent="center"
            >
              Ver carrinho
            </MenuItem>
          </MenuList>
        )}
      </Menu>
      <Badge
        right="-5px"
        top="-5px"
        borderRadius={10}
        position="absolute"
        colorScheme={"red"}
      >
        {!!products.length && products.length}
      </Badge>
    </Box>
  );
}
