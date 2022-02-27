import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      h="sm"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      overflow="hidden"
      m={5}
      sx={{
        "@media screen and (max-width: 480px)": {
          w: 300,
        },
        "@media screen and (min-width: 480px)": {
          w: "sm",
        },
      }}
    >
      <Box
        overflow={"hidden"}
        display="flex"
        justifyContent={"center"}
        h={"70%"}
        bg={"black"}
      >
        <Image
          objectFit={"contain"}
          src={product.imageUrl}
          alt={`Picture of ${product.name}`}
        />
      </Box>

      <Box p="6">
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            fontSize="2xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {product.name}
          </Box>
          <Tooltip
            label="Add to cart"
            bg="white"
            placement={"top"}
            color={"gray.800"}
            fontSize={"1.2em"}
          >
            <chakra.a href={"#"} display={"flex"}>
              <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
            </chakra.a>
          </Tooltip>
        </Flex>

        <Flex justifyContent="space-between" alignContent="center">
          <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
            <Box as="span" color={"gray.600"} fontSize="lg">
              $
            </Box>
            {product.price.toFixed(2)}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
