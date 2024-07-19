import { CartContext } from "@/context/cartContext";
import { ISubmitCart } from "@/interfaces/cart";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import confirmIcon from "@/public/assets/images/icon-order-confirmed.svg"
import CartItemList from "./CartItemList";
import Image from "next/image";

interface ConfirmOrderModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetCart: () => void;
}

const ConfirmOrderModal: React.FC<ConfirmOrderModalProps> = ({ isOpen, setIsOpen, resetCart }) => {
  const { cart } = useContext(CartContext);
  const [loading, setLoading] = useState<boolean>(false);
  const closeConfirmModal = useCallback(() => {
    resetCart();
    setIsOpen(false);
  }, [resetCart, setIsOpen])

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    const controller = new AbortController();
    const postData = async () => {
      const postBody: ISubmitCart = {
        items: Object.values(cart).map((cartItem) => ({ id: parseInt(cartItem.id), amount: cartItem.amount }))
      }
      await fetch("/api/cart",
        {
          method: "POST",
          signal: controller.signal,
          body: JSON.stringify(postBody),
          headers: {
            "Content-Type": "application/json",
          }
        })
        .finally(() => {
          setLoading(false);
        })
    }
    postData();

    return () => {
      controller.abort();
    }
  }, [isOpen, cart])

  return (
    <>
      {
        isOpen &&
        <>
          <div className="bg-black opacity-20 h-screen w-screen fixed left-0 top-0"></div>
          <div className="h-screen w-screen fixed left-0 top-0 flex justify-center items-center">
            <div className="w-1/3 bg-white rounded-xl p-6">
              {
                loading ?
                  <div className="h-full w-full">
                    <p className="text-red_custom text-xl font-bold m-auto">Loading</p>
                  </div>
                  :
                  <>
                    <Image src={confirmIcon} alt="" />
                    <p className="text-2xl font-bold my-4">
                      Order Confirmed
                    </p>
                    <p className="text-sm font-thin my-4">
                      We hope you enjoy your food!
                    </p>
                    <CartItemList className="bg-rose-50 p-4 my-4" disableRemoveButton />
                    <button
                      onClick={closeConfirmModal}
                      className="h-10 bg-red_custom rounded-3xl w-full text-white hover:bg-red-900 duration-100 transition font-semibold"
                    >
                      Start New Order
                    </button>
                  </>
              }
            </div>
          </div>
        </>
      }
    </>
  )
}

export default memo(ConfirmOrderModal);
