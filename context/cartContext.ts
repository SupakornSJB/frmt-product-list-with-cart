import { IFullItem } from "@/interfaces/item";
import { createContext } from "react";

export interface ICart {
  [id: string]: ICartItem
}

export interface ICartItem {
  id: string;
  name: string,
  amount: number,
  price: number
}

export interface ICartContext {
  cart: ICart
  setCart: React.Dispatch<React.SetStateAction<ICart>>,
  addToCart: (cart: IFullItem) => void;
  reduceFromCart: (itemId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  cart: {},
  setCart: () => { },
  addToCart: (cart) => { },
  reduceFromCart: (cart) => { }
});
