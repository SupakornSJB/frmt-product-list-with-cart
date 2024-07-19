import { CartContext, ICartItem } from "@/context/cartContext";
import { memo, useContext, useMemo } from "react";
import RemoveIcon from "./icons/RemoveIcon";

interface ProductCardListProps {
  cartItem: ICartItem;
  disableRemoveButton?: boolean
}

const ProductCardList: React.FC<ProductCardListProps> = ({ cartItem, disableRemoveButton }) => {
  const totalPriceText = useMemo(() => (cartItem.amount * cartItem.price).toFixed(2), [cartItem.price, cartItem.amount]);
  const priceText = useMemo(() => cartItem.price.toFixed(2), [cartItem.price]);
  const { reduceFromCart } = useContext(CartContext);

  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex flex-col">
        <div className="font-bold text-lg">
          {cartItem.name}
        </div>
        <div className="flex font-thin gap-4">
          <p className="text-red_custom font-semibold text-xs">{cartItem.amount}x</p>
          <p className="text-xs">@{priceText}</p>
          <p className="text-xs font-semibold">${totalPriceText}</p>
        </div>
      </div>
      {
        !disableRemoveButton &&
        <button className="h-4 aspect-square group border-[#CAAFA7] border rounded-full hover:border-black duration-100 transition" onClick={() => reduceFromCart(cartItem.id)}>
          <RemoveIcon className="h-2 aspect-square fill-[#CAAFA7] group-hover:fill-black duration-100 transition m-auto" />
        </button>
      }
    </div>
  )
}

export default memo(ProductCardList);
