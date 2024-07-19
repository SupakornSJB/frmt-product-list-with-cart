import { CartContext } from "@/context/cartContext";
import { useCallback, useContext, useMemo, useState } from "react";
import Image from "next/image";
import emptyCartImg from "@/public/assets/images/illustration-empty-cart.svg"
import carbonImg from "@/public/assets/images/icon-carbon-neutral.svg"
import ConfirmOrderModal from "./ConfirmOrderModal";

interface CartSummaryProps { }

const CartSummary: React.FC<CartSummaryProps> = () => {
  const { cart, setCart } = useContext(CartContext);
  const totalCost = useMemo(() => {
    let cumCost = 0;
    Object.values(cart).map((cartItem) => cumCost += cartItem.amount * cartItem.price)
    return cumCost;
  }, [cart])
  const totalCostString = useMemo(() => "$" + totalCost.toFixed(2), [totalCost])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const resetCart = useCallback(() => {
    console.log("Resetting Cart");
    setCart({});
  }, [setCart])

  return (
    <>
      <div className="flex flex-col gap-4">
        {
          totalCost !== 0 ?
            <>
              <hr className="border" />
              <div className="flex justify-between items-center">
                <div className="text-xs">
                  Order Total
                </div>
                <div className="font-bold text-2xl">
                  {totalCostString}
                </div>
              </div>
              <div className="text-xs bg-red-50 h-10 rounded-xl flex justify-center items-center gap-2">
                <Image src={carbonImg} alt="" />
                <div>
                  This is a {" "}
                  <span className="font-bold">carbon neutral</span> {" "}
                  Delivery {" "}
                </div>
              </div>
              <button
                className="rounded-3xl bg-red_custom h-10 text-white font-semibold text-sm hover:bg-red-900 transition duration-100"
                onClick={() => setIsModalOpen(true)}
              >
                Confirm Order
              </button>
            </>
            :
            <>
              <div className="m-auto">
                <Image src={emptyCartImg} alt="empty" />
              </div>
              <span className="m-auto font-semibold text-red_custom text-sm">Your added item will appeared here</span>
            </>
        }
      </div>
      <ConfirmOrderModal setIsOpen={setIsModalOpen} isOpen={isModalOpen} resetCart={resetCart} />
    </>
  )
}

export default CartSummary;
