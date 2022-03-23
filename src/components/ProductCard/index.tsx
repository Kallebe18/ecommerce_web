import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Text,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { FiPlusCircle, FiCamera } from "react-icons/fi";
import { useCart } from "../../hooks/useCart";
import { Product } from "../../types";
import { formatNumberToBRL } from "../../utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addProduct } = useCart();
  const imageContainerBackground = useColorModeValue("transparent", "black");

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      overflow="hidden"
      m={5}
      sx={{
        "@media screen and (max-width: 480px)": {
          w: 280,
          h: 250,
        },
        "@media screen and (min-width: 480px)": {
          w: 300,
          h: 280,
        },
      }}
    >
      <Flex
        bg={imageContainerBackground}
        overflow={"hidden"}
        h={"70%"}
        justify={"center"}
        align={"center"}
      >
        {product.imageUrl ? (
          <Image
            bg="transparent"
            objectFit={"contain"}
            src={product.imageUrl}
            alt={`Picture of ${product.name}`}
          />
        ) : (
          <FiCamera size={40} />
        )}
      </Flex>

      <Box p={3} pr={5}>
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Heading as="h5" size="md">
            {product.name}
          </Heading>
          <Tooltip
            label="Adicionar ao carrinho"
            bg="white"
            placement={"top"}
            color={"gray.800"}
            fontSize={"1.2em"}
          >
            <IconButton
              bg="transparent"
              sx={{
                _hover: "none",
              }}
              onClick={() => addProduct(product)}
              aria-label="Add product to cart"
              icon={<Icon as={FiPlusCircle} h={7} w={7} alignSelf={"center"} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignContent="center">
          <Text fontSize={"md"}>{formatNumberToBRL(product.price)}</Text>
        </Flex>
      </Box>
    </Box>
  );
}
