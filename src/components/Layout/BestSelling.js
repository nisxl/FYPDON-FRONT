import React, { useContext, useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Divider, notification, Space } from "antd";

import storeItems from "../../data/items.json";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import SEED from "../../env";

const Context = React.createContext({
  name: "Default",
});

function BestSelling({ _id, name, price, image, rating }) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    console.log("ran");
    api.info({
      message: `Cart`,
      description: "Item added to the cart",
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useCart();
  const quantity = getItemQuantity(_id);
  const rat = [1, 2, 3, 4, 5];
  const [nischal, setNischal] = useState(false);
  const [product, setProduct] = useState([]);
  const alertMessage = () => {
    setNischal(!nischal);
  };
  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`/api/products/${_id}`);
      setProduct(data);
    }
    fetchProduct();
  }, []);

  const handlelogic = () => {
    increaseCartQuantity(_id);
    openNotification("bottomLeft");
  };

  return (
    <section className="flex flex-col h-[410px] items-center">
      <div className="w-[180px] flex flex-col text-[15px] font-semibold">
        <Link to={`/product/${_id}`} state={{ id: _id }}>
          {/* <Link to="/product" state={{ id: props.key }}> */}{" "}
          <img
            src={`${SEED}${image}`}
            className="w-[180px] h-[210px] rounded-lg cursor-pointer"
          />
        </Link>
        <Link
          to={`/product/${_id}`}
          className="no-underline"
          state={{ id: _id }}
        >
          {/* <Link to="/product" state={{ id: props.key }} className="no-underline"> */}
          <p className="no-underline text-black mx-2 mt-2 h-[46px] cursor-pointer">
            {name}
          </p>
        </Link>
        <div className="flex self-center gap-2 mb-3 mt-[20px]">
          {rat.map((item, i) => {
            return item <= Math.floor(rating) ? (
              <img src="../../images/star.png" className="h-[19px] w-[19px]" />
            ) : (Math.abs(rating - item) > 0.25) &
              (Math.abs(rating - item) < 0.76) ? (
              <img
                src="../../images/starHalf.png"
                className="h-[19px] w-[19px]"
              />
            ) : Math.abs(item - rating) < 0.25 ? (
              <img src="../../images/star.png" className="h-[19px] w-[19px]" />
            ) : (
              <img
                src="../../images/starEmpty.png"
                className="h-[19px] w-[19px]"
              />
            );
          })}

          <span>{rating}</span>
        </div>
      </div>

      <div className="font-mono">
        {quantity === 0 ? (
          <Context.Provider value={contextValue}>
            {contextHolder}

            <Button
              type="primary"
              className="bg-[#FBEDCD] font-semibold text-black"
              onClick={() => {
                openNotification("bottomLeft");
                increaseCartQuantity(_id);
              }}
            >
              + Add to Cart
            </Button>
          </Context.Provider>
        ) : (
          <div className="flex items-center flex-col gap-[0.5rem]">
            <div
              className="flex items-center justify-center text-[14px]
            gap-[0.5rem]"
            >
              <div
                className="px-[7px] cursor-pointer rounded-md border-[1.5px] border-gray-300"
                onClick={() => decreaseCartQuantity(_id)}
              >
                -
              </div>
              <div>
                <span className="font-semibold text-[15px]">{quantity} </span>
                in cart
              </div>
              <div
                className="px-[7px] cursor-pointer rounded-md border-[1.5px] border-gray-300"
                onClick={() => increaseCartQuantity(_id)}
              >
                +
              </div>
            </div>
            <Button
              type="primary"
              className="text-sm bg-[#4A1D1F]"
              onClick={() => removeFromCart(_id)}
            >
              Remove
            </Button>
          </div>
        )}{" "}
      </div>
    </section>
  );
}

export default BestSelling;
