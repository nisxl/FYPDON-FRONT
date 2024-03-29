import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Cakes from "../components/Layout/Cakes";
import { listProducts } from "../actions/productActions";
import { Pagination } from "antd";

const { Option } = Select;

const CakesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const { id } = useParams();
  const idNum = parseInt(id);

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = location.search;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const addToCartHandler = () => {
    navigate(`/cart/${idNum}?qty=${qty}`);
  };

  const handleSort = (value) => {
    setSortOrder(value);
  };

  const sortCakes = (cakes, sortOrder) => {
    if (sortOrder === "asc") {
      return cakes.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      return cakes.sort((a, b) => b.price - a.price);
    } else {
      return cakes;
    }
  };

  const sortedCakes = sortCakes(products, sortOrder);

  const PAGE_SIZE = 3;
  const pageCount = Math.ceil(sortedCakes.length / PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedCakes = sortedCakes.slice(start, end);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const cakes = paginatedCakes.map((item, index) => {
    return <Cakes key={index} {...item} />;
  });

  return (
    <div className="bg-neutral-300 relative min-h-screen">
      <img
        src="../images/pasteries.jpg"
        alt="home"
        className=" w-screen h-[300px] object-cover"
      />

      <div className="">
        <div className="py-6 bg-neutral-100 flex flex-col justify-center gap-5 rounded-lg shadow-md p-6 mx-[100px] relative mt-[-40px] font-bold text-xl">
          <span className="self-center">CAKES</span>
          <div>
            <Select defaultValue="" onChange={handleSort}>
              <Option value="">Sort by price</Option>
              <Option value="asc">Price: Low to High</Option>
            </Select>
          </div>
          <div className="flex flex-wrap px-[160px] justify-around">
            {cakes}
          </div>
          <Pagination
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={sortedCakes.length}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CakesPage;
