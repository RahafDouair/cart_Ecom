import { IProduct } from './iproduct';

export interface ICart {
  _id: string;
  cartOwner: string;
  products: Product2[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

interface Product2 {
  count: number;
  _id: string;
  product: IProduct;
  price: number;
}
