import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "antd";

import { useCart } from "../context/CartContext";
import Message from "../components/UI/Message";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/Layout/CheckoutSteps";
import CheckOutItem from "../components/Cart/checkOutItem";
import { listProducts } from "../actions/productActions";
import { createOrder } from "../actions/orderActions";
function OrderPage() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { error, success, order } = orderCreate;

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.shippingDetails);

  // const cart = useSelector((state) => state.shippingDetails);
  // const { shippingAddress, paymentMethod } = cart;

  // const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  // const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));

  const { closeCart, cartItems, cartQuantity } = useCart();
  const productList = useSelector((state) => state.productList);
  const { loading, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const subTotal = cartItems.reduce((total, cartItem) => {
    const item = products.find((i) => i._id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const shippingPrice = 120;
  const taxPrice = Number(0.13 * subTotal).toFixed(2);
  const totalPrice = (
    Number(subTotal) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [success, navigate]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        // itemsPrice: cart.itemsPrice,
        // shippingPrice: cart.shippingPrice,
        // taxPrice: cart.taxPrice,
        // totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex justify-around">
        <div>
          <h2>Shipping:</h2>
          <h3>
            {/* {cart.shippingAddress.address}, {cart.shippingAddress.city}
            {"   "}
            {cart.shippingAddress.postalCode},{"   "}
            {cart.shippingAddress.country} */}
          </h3>
        </div>

        <div>
          <h2>payment method</h2>
          {/* <h3>{cart.paymentMethod}</h3> */}
        </div>
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

            {cartItems.length === 0 ? (
              <Message variant="info">Your cart is empty</Message>
            ) : (
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
                  <span className=" font-normal ">
                    Rs. {cart.shippingPrice}
                  </span>
                </div>
                <div className="border-b-2  p-4  text-[18px] flex justify-between">
                  <span className=" text-[#4A1D1F]">Tax</span>
                  {/* <span className=" font-normal ">Rs. {cart.taxPrice}</span> */}
                </div>
                <div className="p-4 border-b-2 text-[18px] flex justify-between">
                  <span className=" text-[#4A1D1F]">Grand Total</span>
                  {/* <span className=" font-normal ">{cart.totalPrice}</span> */}
                </div>
                <div className="py-4  flex align-middle justify-center">
                  <div>
                    {error && <Message variant="danger">{error}</Message>}
                  </div>
                  <div
                    onClick={placeOrder}
                    type="primary"
                    className="text-lg flex cursor-pointer items-center justify-center text-white mx-[10] py-1 rounded-lg w-[250px] bg-[#4A1D1F]"
                  >
                    <span className="text-center ">Buy</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
