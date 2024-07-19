import { CartContext, ICartItem } from "@/context/cartContext";
import ProductCartList from "./ProductCartList";
import { useContext, useMemo } from "react";

interface CartItemListProps {
  className?: string;
  disableRemoveButton?: boolean
}

const CartItemList: React.FC<CartItemListProps> = ({ className, disableRemoveButton }) => {
  const { cart } = useContext(CartContext);
  const cartList: ICartItem[] = useMemo(() => {
    return Object.values<ICartItem>(cart);
  }, [cart])

  return (
    <>
      <div className={`flex flex-col ${className}`}>
        {cartList.map((cart, idx) => <>
          <ProductCartList cartItem={cart} key={cart.id} disableRemoveButton={disableRemoveButton} />
          {idx !== cartList.length - 1 && <hr />}
        </>)}
      </div>
    </>
  )
}

export default CartItemList;
