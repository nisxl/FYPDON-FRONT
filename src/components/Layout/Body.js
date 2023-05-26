import React, { useMemo } from "react";
import { FaRegUser } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import storeItems from "../../data/items.json";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BestSelling from "./BestSelling";
import Recommended from "./Recommended";
import Testimonial from "./Testimonial";
import { useCart } from "../../context/CartContext";
import ShoppingCart from "../Cart/shoppingCart";
import { Button, Dropdown, Menu } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";

import { LinkContainer } from "react-router-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

// gandu location best selling discount pricing flavors customizable pricing/lbs

import ProductCarousel from "./ProductCarousel";

import Loader from "../UI/Loader";

import Message from "../UI/Message";
import Paginate from "../UI/Paginate";
import SearchBox from "../UI/SearchBox";
function Body() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openCart, cartQuantity } = useCart();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = location.search;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  // const bestSeller = products.map((item, index) => {
  //   return <BestSelling key={index} {...item} />;
  // });
  // const recommended = products.map((item, index) => {
  //   return <Recommended key={index} {...item} />;
  // });

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/cakes">Cakes</Link>
      </Menu.Item>
      <Menu.Item key="2">Non Cakes</Menu.Item>
    </Menu>
  );

  return (
    <div className="dark:bg-black dark:text-white mt-[-2rem]">
      {/* {!keyword && <ProductCarousel />} */}
      <div className="flex">
        <section className="flex flex-col gap-7 m-10">
          <h1 className="text-[#4A1D1F] dark:text-[#FBEDCD] font-[600] text-3xl mt-[126px] dark:">
            <p>Bring You Happiness</p> <p> through a piece of cake</p>
          </h1>
          <h2 className="font-[500] text-[17px] dark:text-white mt-[30px]">
            We make Different type of cakes, chocolates, soft cookies,
            cheesecake pies or anything you want.
          </h2>
          <SearchBox />
          <div className="flex gap-3 mt-[7px] mb-[260px] z-0">
            <Dropdown overlay={menu} placement="bottomLeft" arrow>
              <Button className="bg-[#4A1D1F] text-white w-[114px]">
                Categories
              </Button>
            </Dropdown>
            <Button className="border-2 border-[#4A1D1F] dark:text-[#FBEDCD] bg-transparent text-[#4A1D1F]">
              See All Menu
            </Button>
          </div>
        </section>
        <img
          src="../../images/birthdaycake.png"
          className="h-[500px] mt-[50px] bg-"
        />
      </div>

      <section>
        <div className="flex mb-10">
          <div className="w-[35%]  flex justify-end pr-28 self-center dark:text-[#FBEDCD] text-[24px] font-semibold text-[#4A1D1F]">
            Try Our Best Selling
          </div>
          <p className="w-[65%] text-[16px] px-28 border-l-2  border-[#4A1D1F] dark:border-[#FBEDCD]">
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
          <div>
            <BestSelling />
            {/* {bestSeller} */}
            {/* <Paginate page={page} pages={pages} keyword={keyword} /> */}
          </div>
        )}
      </section>
      <section className="flex flex-col items-center">
        <Link to="allproducts">
          <Button
            className="flex mt-5 items-center border-2 border-[#4A1D1F] dark:text-[#FBEDCD] dark:border-[#FBEDCD] bg-transparent text-[#4A1D1F] 
        mb-[141px]"
          >
            <span className="mr-1">View More </span>

            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>

        <p className="text-[24px] text-[#4A1D1F] dark:text-[#FBEDCD] font-semibold">
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
      {/* <div className="flex flex-wrap px-[160px] pt-8 bg-[#FBEDCD] dark:bg-[#4A1D1F] justify-around">
        {recommended}
      </div> */}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="bg-[#FBEDCD] dark:bg-[#4A1D1F]">
          <Recommended />
          {/* {bestSeller} */}
          {/* <Paginate page={page} pages={pages} keyword={keyword} /> */}
        </div>
      )}

      <Testimonial />
    </div>
  );
}

export default Body;
