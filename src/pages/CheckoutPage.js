import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "antd";
import { useCart } from "../context/CartContext";
import CartItem from "../components/Cart/cartItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckOutItem from "../components/Cart/checkOutItem";
import { listProducts } from "../actions/productActions";
function CheckoutPage() {
  const { closeCart, cartItems, cartQuantity } = useCart();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const subTotal = cartItems.reduce((total, cartItem) => {
    const item = products.find((i) => i._id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);
  const deliveryCharge = 120;

  return (
    <div className="flex justify-around">
      <div className="font-semibold flex gap-4 text-[24px] flex-col gap">
        <span>Shopping Cart</span>
        <div className="flex flex-col gap-5 w-[800px]">
          <div className="border-2 p-3 text-xl rounded-[10px]">MY CART</div>
          <div className="flex flex-col  border-2 rounded-[10px]">
            {cartItems.map((item) => (
              <CheckOutItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-[400px] flex flex-col gap-4">
        <span className="text-[24px] font-semibold ">ITEMS: 2</span>
        <div className="flex flex-col gap-5">
          <div className="border-2 p-3 font-semibold  text-xl rounded-[10px]">
            ORDER SUMMARY
          </div>
          <div className="text-[#4A1D1F] font-semibold border-2">
            <div className="border-b-2 p-4 text-[18px] flex justify-between">
              <span className=" text-[#4A1D1F]">Sub Total</span>
              <span className=" font-normal ">
                {cartItems.reduce((total, cartItem) => {
                  const item = products.find((i) => i._id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)}
              </span>
            </div>
            <div className="border-b-2  p-4  text-[18px] flex justify-between">
              <span className=" text-[#4A1D1F]">Delivery Charge</span>
              <span className=" font-normal ">Rs. {deliveryCharge}</span>
            </div>
            <div className="border-b-2  p-4  text-[18px] flex justify-between">
              <span className=" text-[#4A1D1F]">Tax</span>
              <span className=" font-normal ">Rs. {deliveryCharge}</span>
            </div>
            <div className="p-4 border-b-2 text-[18px] flex justify-between">
              <span className=" text-[#4A1D1F]">Grand Total</span>
              <span className=" font-normal ">{subTotal + deliveryCharge}</span>
            </div>
            <div className="py-4  flex align-middle justify-center">
              <Link to={`/shipping`}>
                <div
                  type="primary"
                  className="text-lg flex cursor-pointer items-center justify-center text-white mx-[10] py-1 rounded-lg w-[250px] bg-[#4A1D1F]"
                >
                  <span className="text-center ">Buy</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
