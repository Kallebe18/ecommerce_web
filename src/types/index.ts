export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
}

interface OrderProduct {
  product: Product;
  amount: number;
  price: number;
}

export interface Order {
  id: string;
  total: number;
  discount: number;
  products: OrderProduct[];
}
