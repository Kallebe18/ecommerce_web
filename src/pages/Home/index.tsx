import { Center, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard";
import { api } from "../../services/api";
import { Product } from "../../types";

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    listProducts();
  }, []);

  const listProducts = async () => {
    try {
      const { data } = await api.get<Product[]>("/products");
      setProducts(data);
    } catch {}
  };

  return (
    <Center flexDirection="column" p={5}>
      <Heading mt={20} mb={10} textAlign="center" variant="h3">
        Conheça nossos produtos
      </Heading>
      <Flex justifyContent="center" wrap="wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Flex>
    </Center>
  );
}
