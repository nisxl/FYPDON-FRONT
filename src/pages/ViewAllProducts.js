import { FaRegUser } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BestSelling from "../components/Layout/BestSelling";
import { Button, Divider, notification, Space } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import Loader from "../components/UI/Loader";

import Message from "../components/UI/Message";
import Paginate from "../components/UI/Paginate";

import React from "react";

function ViewAllProducts() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = location.search;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const bestSeller = products.map((item, index) => {
    return <BestSelling key={index} {...item} />;
  });

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <div className="flex flex-wrap px-[140px]">{bestSeller}</div>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
      <section className="flex flex-col items-center">
        <Button className="flex mt-5 items-center border-2 border-[#4A1D1F] bg-transparent text-[#4A1D1F] mb-[141px]">
          <span className="mr-1">View More </span>
          <AiOutlineArrowRight size={20} />
        </Button>
      </section>
    </div>
  );
}

export default ViewAllProducts;
