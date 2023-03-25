import React, { useMemo } from "react";
import { FaRegUser } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import storeItems from "../../data/items.json";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import BestSelling from "./BestSelling";
import Recommended from "./Recommended";
import Testimonial from "./Testimonial";
import { useCart } from "../../context/CartContext";
import ShoppingCart from "../Cart/shoppingCart";
import { Button, Divider, notification, Space } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import Loader from "../UI/Loader";
import Message from "../UI/Message";
function Body() {
  const { openCart, cartQuantity } = useCart();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const bestSeller = products.map((item) => {
    return <BestSelling key={item._id} {...item} />;
  });
  const [nischal, setNischal] = useState(false);
  const recommended = products.map((item) => {
    return <Recommended key={item._id} {...item} />;
  });
  return (
    //nav bar
    <div>
      {/* <Link to="/product" className="no-underline">
        <p className="no-underline text-black mx-2 mt-2 h-[46px] cursor-pointer">
          nischal
        </p>
      </Link> */}

      <div
        className="bg-slate-50 flex justify-between sticky top-0
          items-center h-[64px]"
      >
        <div>
          <img
            className="h-[50px] w-[47px]"
            src="../../images/rollers.jpg"
            alt="nscihhal"
          />
        </div>
        <div className="flex pr-10 gap-8">
          <p className="cursor-pointer">Home</p>
          <p className="cursor-pointer">Categories</p>
          <p className="cursor-pointer">About Us</p>
          <p className="cursor-pointer">Contact Us</p>
          <Link to={"/profile"}>
            <div className="cursor-pointer">
              <FaRegUser />
            </div>
          </Link>
          <div onClick={openCart} className="cursor-pointer">
            <span>{cartQuantity}</span>
            <BsCartCheck />
          </div>
        </div>
      </div>
      <section className="flex flex-col gap-7">
        <h1 className="text-[#4A1D1F] font-[600] text-3xl mt-[126px]">
          <p>Bring You Happiness</p> <p> through a piece of cake</p>
        </h1>
        <h2 className="font-[500] text-[20px] mt-[30px]">
          We make Different type of cakes, chocolates, soft cookies, cheesecake
          pies or anything you want.
        </h2>
        <div className="flex gap-3 mt-[7px] mb-[260px]">
          <Button className="bg-[#4A1D1F] text-[#DAC6C7] w-[114px] ">
            Order Now
          </Button>
          <Button className="border-2 border-[#4A1D1F] bg-transparent text-[#4A1D1F]">
            See All Menu
          </Button>
        </div>
      </section>
      <section>
        <div className="flex mb-10">
          <div className="w-[35%]  flex justify-end pr-28 self-center text-[24px] font-semibold text-[#4A1D1F]">
            Try Our Best Selling
          </div>
          <p className="w-[65%] text-[16px] px-28 border-l-2  border-[#4A1D1F]">
            Here’s our best creations that everyone loves. Lightness and
            sweetness of the cake make you want more and more. Start from cake,
            bread and other creations.{" "}
          </p>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="flex flex-wrap px-[90px] gap-12">{bestSeller}</div>
        )}
      </section>
      <section className="flex flex-col items-center">
        <Button
          className="flex mt-5 items-center border-2 border-[#4A1D1F] bg-transparent text-[#4A1D1F] 
        mb-[141px]"
        >
          <span className="mr-1">View More </span>

          <AiOutlineArrowRight size={20} />
        </Button>

        <p className="text-[24px] text-[#4A1D1F] font-semibold">
          Cake Ordering we make it easy
        </p>
        <p className="mt-[41px] text-[16px] font-semibold">
          Click here to contact us or visit the nearest store to custom order
          the cake
        </p>
        <Button className="bg-[#4A1D1F] text-[#DAC6C7] w-[114px] mt-[41px] mb-[76px]">
          Contact Us
        </Button>
      </section>
      <div className="flex flex-wrap px-[90px] gap-12 bg-[#FBEDCD]">
        {recommended}
      </div>

      <Testimonial />
    </div>
  );
}

export default Body;
