import { ItemImage } from "@prisma/client"
import { IFullItem } from "@/interfaces/item"
import Image from "next/image"
import { memo, useCallback, useContext, useMemo } from "react"
import { CartContext } from "@/context/cartContext"
import CartIcon from "./icons/CartIcon"
import DecrementIcon from "./icons/IncrementIcon"
import IncrementIcon from "./icons/DecrementIcon"

interface ProductCardProps {
  item: IFullItem
}

const removeDotFromImageUrl = (itemImage: ItemImage): ItemImage => {
  const removeFirstLetter = (s: string): string => s.charAt(0) == "." ? s.substring(1) : s;

  return {
    id: itemImage.id,
    desktop: removeFirstLetter(itemImage.desktop),
    thumbnail: removeFirstLetter(itemImage.thumbnail),
    tablet: removeFirstLetter(itemImage.tablet),
    mobile: removeFirstLetter(itemImage.mobile),
  }
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const filteredUrl = useCallback(removeDotFromImageUrl, [item.id]);
  const priceText = useMemo(() => "$" + (Math.round(item.price * 100) / 100).toFixed(2), [item.price]);
  const { cart, addToCart, reduceFromCart } = useContext(CartContext);
  const currentAmountInCart = useMemo(() => cart[item.id.toString()] ? cart[item.id.toString()].amount : 0, [cart[item.id.toString()]])
  const isAlternativeButton = useMemo(() => currentAmountInCart > 0, [currentAmountInCart]);
  const mainButtonCallback = useCallback(() => {
    !isAlternativeButton && addToCart(item);
  }, [item, isAlternativeButton, addToCart])

  return (
    <div className="flex flex-col w-48">
      <div className="relative">
        {
          item.images &&
          <Image
            src={filteredUrl(item.images).desktop}
            alt="img"
            width={200}
            height={100}
            className={`transition duration-300 h-auto rounded-lg ${isAlternativeButton && 'border-red_custom border-2'}`} />
        }
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 
            translate-y-1/2 rounded-2xl border 
            border-red_custom w-2/3 h-7 text-red_custom text-xs transition duration-200 
            flex justify-between items-center px-2 
            ${!isAlternativeButton ? "cursor-pointer bg-rose-50 hover:bg-red_custom hover:text-white" : "bg-red_custom text-white"} group`}
          onClick={mainButtonCallback}
        >{isAlternativeButton ?
          <>
            <button onClick={() => reduceFromCart(item.id.toString())} className="h-1/2 aspect-square rounded-full bg-white">
              <DecrementIcon className="fill-red_custom w-2 m-auto" />
            </button>
            <p className="font-bold">{currentAmountInCart}</p>
            <button onClick={() => addToCart(item)} className="h-1/2 aspect-square rounded-full bg-white">
              <IncrementIcon className="fill-red_custom h-2 m-auto" />
            </button>
          </>
          :
          <button className="flex justify-evenly w-full items-center">
            <CartIcon className="group-hover:fill-white transition duration-100" />
            <p>Add To Cart</p>
          </button>
          }
        </div>
      </div>
      <div className="pt-4">
        <p className="font-thin text-xs">{item.category}</p>
        <p className='text-sm'>{item.name}</p>
        <p className='text-sm text-red_custom'>{priceText}</p>
      </div>
    </div>
  )
}

export default memo(ProductCard);
