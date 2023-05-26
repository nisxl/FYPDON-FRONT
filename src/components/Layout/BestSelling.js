import React, { useContext, useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SEED } from "../../env";
import Rating from "../UI/Rating";
import { listTopProducts } from "../../actions/productActions";
import { listRecommendedProducts } from "../../actions/productActions";

const Context = React.createContext({
  name: "Default",
});

function BestSelling() {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const idNum = parseInt(id);
  const userLogin = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated); //getting this part of the state
  const {
    error: errorTopRated,
    loading: loadingTopRated,
    products: productsTopRated,
  } = productTopRated;

  const addToCartHandler = () => {
    navigate(`/cart/${idNum}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-wrap px-[160px] gap-10 justify-around">
      {productsTopRated.map((product) => (
        <section className="flex flex-col h-[410px] items-center">
          <div className="w-[180px] flex flex-col text-[15px] font-semibold">
            <Link to={`/product/${product._id}`} state={{ id: product._id }}>
              {/* <Link to="/product" state={{ id: props.key }}> */}{" "}
              <img
                src={`${SEED}${product.image}`}
                className="w-[180px] h-[210px] rounded-lg cursor-pointer"
              />
            </Link>
            <Link
              to={`/product/${product._id}`}
              className="no-underline"
              state={{ id: product._id }}
            >
              {/* <Link to="/product" state={{ id: props.key }} className="no-underline"> */}
              <p className="no-underline text-black mx-2 mt-2 h-[46px] cursor-pointer">
                {product.name}
              </p>
            </Link>
            <div className="flex self-center gap-2 mb-3 mt-[20px]">
              <Rating value={product.rating} colors="#f8e825" />

              <span>{product.rating}</span>
            </div>
          </div>
          {product.countInStock > 0 ? (
            <div className="font-mono">
              <Button
                type="primary"
                className="bg-[#FBEDCD] font-semibold text-black"
                onClick={addToCartHandler}
              >
                + Add to Cart
              </Button>
            </div>
          ) : (
            <p className="text-center text-red-500 font-bold">Out of Stock</p>
          )}
        </section>
      ))}
      ;
    </div>
  );
}

export default BestSelling;
