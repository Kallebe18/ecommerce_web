import { Flex } from "@chakra-ui/react";
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
    <Flex justifyContent="center">
      <Flex wrap="wrap">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </Flex>
    </Flex>
  );
}
