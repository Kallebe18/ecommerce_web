/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { Product } from "../types";

export interface CartProduct extends Product {
  amount: number;
  total: number;
}

interface CartContextDTO {
  products: CartProduct[];
  total: number;
  addProduct(product: Product): void;
  removeProduct(id: string): void;
  decreaseProduct(id: string): void;
  increaseProduct(id: string): void;
  clearCart(): void;
}

const CartContext = createContext<CartContextDTO>({} as CartContextDTO);

export function CartProvider({ children }: PropsWithChildren<any>) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [products]);

  const calculateTotal = () => {
    setTotal(
      products.reduce((sum, product) => sum + product.price * product.amount, 0)
    );
  };

  const addProduct = (product: Product) => {
    const productsCopy = [...products];

    const productAlreadyInCart = products.findIndex(
      (prod) => prod.id === product.id
    );

    if (productAlreadyInCart !== -1) {
      productsCopy[productAlreadyInCart].amount += 1;
      toast.remove();
      toast.success("Produto adicionado ao carrinho!");
      return setProducts(productsCopy);
    }

    const newProduct = {
      ...product,
      total: product.price * 1,
      amount: 1,
    };

    toast.success("Produto adicionado ao carrinho!");
    return setProducts([...products, newProduct]);
  };

  const removeProduct = async (productId: string) => {
    setProducts(products.filter(({ id }) => id !== productId));
    toast("Produto removido do carrinho!", {
      icon: "⚠️",
    });
  };

  const decreaseProduct = (productId: string) => {
    setProducts(
      products.map((product) => {
        if (productId === product.id && product.amount > 1) {
          const newAmount = product.amount - 1;
          return {
            ...product,
            amount: newAmount,
            total: product.price * newAmount,
          };
        }
        return product;
      })
    );
  };

  const increaseProduct = (productId: string) => {
    setProducts(
      products.map((product) => {
        if (productId === product.id) {
          if (product.stock < product.amount + 1) {
            toast.remove();
            toast.error("Estoque insuficiente.");
            return product;
          }
          const newAmount = product.amount + 1;
          return {
            ...product,
            amount: newAmount,
            total: product.price * newAmount,
          };
        }
        return product;
      })
    );
  };

  const clearCart = () => {
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        total,
        addProduct,
        removeProduct,
        decreaseProduct,
        increaseProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
