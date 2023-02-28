import { useCart } from "../../context/CartContext";
import { Button } from "react-bootstrap";

import { Offcanvas, Stack } from "react-bootstrap";
import CartItem from "./cartItem";
import storeItems from "../../data/items.json";

const ShoppingCart = ({ isOpen }) => {
  const { closeCart, cartItems, cartQuantity } = useCart();

  return (
    <div className="">
      <Offcanvas
        show={isOpen}
        className="bg-white"
        onHide={closeCart}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <span className="font-poppins text-lg">Your Cart </span>
            <span className="font-mono text-[#4A1D1F] font-semibold">
              ({cartQuantity})
            </span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="flex flex-col gap-3 ">
              <div className="px-3 flex justify-between text-[#4A1D1F] font-mono">
                <span>Sub Total </span>
                <span>
                  {cartItems.reduce((total, cartItem) => {
                    const item = storeItems.find((i) => i.id === cartItem.id);
                    return total + (item?.price || 0) * cartItem.quantity;
                  }, 0)}
                </span>
              </div>
              <div className="px-[16px] flex justify-between">
                <div
                  onClick={closeCart}
                  className="border-2 border-[#4A1D1F] rounded-full text-[#4A1D1F] py-[6px] px-4 cursor-pointer"
                >
                  Continue Shopping
                </div>
                <div className="bg-[#4A1D1F] rounded-full py-[6px] px-4 text-white cursor-pointer">
                  Check Out
                </div>
              </div>
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
export default ShoppingCart;
