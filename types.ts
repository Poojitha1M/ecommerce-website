// types.ts
export interface Product {
  id: number;
  price: number;
  category: string;
  rating: any;
  title: string
}

export interface CartItem {
  product: Product;
  quantity: number;
}