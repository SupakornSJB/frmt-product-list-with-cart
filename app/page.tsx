"use client"

import ProductCard from "@/components/ProductCard";
import { useEffect, useState, useCallback, useMemo } from "react";
import { CartContext, ICart } from "@/context/cartContext";
import { IFullItem, IItemsList } from "@/interfaces/item";
import { ICartItem } from "@/context/cartContext";
import CartSummary from "@/components/CartSummary";
import CartItemList from "@/components/CartItemList";

// Setup for Items in DB, Uncomment to use, Need to run only once
// import jsonItem from "@/public/data.json"
// import { addItemsToDB } from "@/utils/addToDb";
// addItemsToDB(jsonItem);

export default function Home() {
  const [cart, setCart] = useState<ICart>({});
  const [allItems, setAllItems] = useState<IFullItem[]>([]);
  const totalItemsInCart = useMemo(() => {
    let count = 0;
    Object.values(cart).forEach(item => {
      count += item.amount;
    })
    return count;
  }, [cart])

  const addToCart = useCallback((item: IFullItem) => {
    let newCartItem: ICartItem | undefined = { ...cart[item.id] };
    if (cart[item.id.toString()])
      newCartItem.amount++;
    else
      newCartItem = { name: item.name, price: item.price, amount: 1, id: item.id.toString() };

    setCart((prev) => {
      const prevCopy = { ...prev };
      prevCopy[item.id.toString()] = newCartItem;
      return prevCopy;
    })
  }, [cart, setCart])

  const reduceFromCart = useCallback((itemId: string) => {
    const currentItem = cart[itemId]
    if (!currentItem) return;
    if (currentItem.amount <= 1) {
      setCart((prev) => {
        const prevCopy = { ...prev };
        delete prevCopy[itemId];
        return prevCopy;
      })
      return;
    }

    setCart((prev) => {
      const prevCopy = { ...prev };
      prevCopy[itemId] = { ...prev[itemId], amount: prev[itemId].amount - 1 }
      return prevCopy
    })
  }, [cart, setCart])

  useEffect(() => {
    const abortController = new AbortController();
    const fetchList = async () => {
      const data = await fetch("/api/items", { signal: abortController.signal }).then(res => res.json()) as IItemsList;
      setAllItems(data.items);
    }
    fetchList();
    return () => {
      abortController.abort();
    }
  }, [])

  return (
    <>
      <CartContext.Provider value={{ cart, setCart, addToCart, reduceFromCart }}>
        <div className="bg-rose-50 w-full h-full fixed -z-40"></div>
        <div className="w-full h-screen">
          <div className="w-3/4 m-auto">
            <div className="w-full h-full p-10 relative">
              <div className="w-2/3 absolute left-0">
                <span className="text-3xl font-bold">
                  Dessert
                </span>
                <div className="flex flex-wrap gap-4 my-4 overflow-auto">
                  {allItems.map((item) => <ProductCard item={item} key={item.id} />)}
                </div>
              </div>
              <div className="w-1/4 fixed left-[58.33%] top-0 py-10 max-h-full">
                <div className="w-full bg-white p-6 rounded-lg">
                  <p className="text-red_custom font-bold">
                    Total Cart ({totalItemsInCart})
                  </p>
                  <CartItemList />
                  <CartSummary />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CartContext.Provider>
    </>
  )
}
