import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import storeItems from "../data/items.json";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";
import { SEED } from "../env";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productActions";
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";
function ProductPage({ match }) {
  const { increaseCartQuantity, decreaseCartQuantity, getItemQuantity } =
    useCart();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch, match]);

  const [weight, setWeight] = useState("1 lbs");
  const [productDesc, setProdDesc] = useState(true);
  const items = [
    {
      label: <a onClick={() => setWeight(2)}>2 lbs</a>,
      key: "0",
    },
    {
      label: <a onClick={() => setWeight(3)}>3 lbs</a>,
      key: "1",
    },
    {
      type: "divider",
    },
  ];

  const location = useLocation();
  const rat = [1, 2, 3, 4, 5];
  const id = location.state?.id;
  const item = products.find((i) => i._id === id);
  const quantity = getItemQuantity(item._id);

  return (
    <div key={id}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="flex gap-[140px]">
          <img
            key={id}
            src={`${SEED}${item.image}`}
            className="ml-[120px] w-[400px] h-[450px]"
            alt="nischal"
          />
          <div className="flex flex-col mt-3 mr-[140px] font-bold">
            <p className="text-[32px] font-bold">{item.name}</p>
            <div className="flex gap-5">
              <div className="flex items-center">
                <div className="flex gap-2 mb-3 mt-[20px] pr-4 border-r-2">
                  {rat.map((rating, i) => {
                    return rating <= Math.floor(item.rating) ? (
                      <img
                        src="../images/star.png"
                        className="h-[19px] w-[19px]"
                      />
                    ) : (Math.abs(item.rating - rating) > 0.25) &
                      (Math.abs(item.rating - rating) < 0.76) ? (
                      <img
                        src="../images/starHalf.png"
                        className="h-[19px] w-[19px]"
                      />
                    ) : Math.abs(rating - item.rating) < 0.25 ? (
                      <img
                        src="../images/star.png"
                        className="h-[19px] w-[19px]"
                      />
                    ) : (
                      <img
                        src="../images/starEmpty.png"
                        className="h-[19px] w-[19px]"
                      />
                    );
                  })}

                  <span>{item.rating}</span>
                </div>
                <div className="flex pl-4 gap-24 items-center">
                  <span>15 reviews</span>
                  <img src="../images/fav.png" className="w-[19px] h-[19px]" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-[60px]">
              <div className="ml-28">
                <p>Weight</p>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <Button onClick={(e) => e.preventDefault()}>
                    <Space>
                      {weight}
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
              <div className="flex flex-col mr-28 gap-[15.8px]">
                <div>Quantity</div>
                <div className="flex py-1 border border-black rounded-md">
                  <div className="flex text-black gap-2 text-[14px]">
                    <span
                      className="border-r px-2 cursor-pointer"
                      onClick={() => decreaseCartQuantity(item.id)}
                    >
                      -
                    </span>
                    <span>{quantity}</span>
                    <span
                      className="px-2 border-l cursor-pointer"
                      onClick={() => increaseCartQuantity(item.id)}
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center mt-[80px] w-[200px] bg-[#4A1D1F] rounded-full py-[6px] text-white cursor-pointer">
                Add to Cart
              </div>
            </div>
            <p className="text-[14px] font-light mt-6">
              Order Directly from Messenger: Send Message
            </p>
            <p className="p-2 text-[12px] font-light bg-[#FBEDCD]">
              This cake requires at least 3 lb(s). The price shown above is per
              lb in base options. The final price might change based on the
              options you choose.
            </p>

            {productDesc ? (
              <div className="flex">
                <p
                  className="flex border-b-2 justify-center cursor-pointer w-[50%]"
                  onClick={() => setProdDesc(true)}
                >
                  Product Description
                </p>
                <p
                  className="flex  border-b justify-center cursor-pointer w-[50%]"
                  onClick={() => setProdDesc(false)}
                >
                  {" "}
                  Ingredients
                </p>
              </div>
            ) : (
              <div className="flex">
                <p
                  className="flex border-b justify-center cursor-pointer w-[50%]"
                  onClick={() => setProdDesc(true)}
                >
                  Product Description
                </p>
                <p
                  className="flex border-b-2 justify-center cursor-pointer w-[50%]"
                  onClick={() => setProdDesc(false)}
                >
                  {" "}
                  Ingredients
                </p>
              </div>
            )}

            <div>
              {productDesc && (
                <p className="text-[12px] max-w-[800px] font-light">
                  Our chocolate chip cookie dough is a delicious, timeless
                  classic. It's our OG recipe, and always a fan favorite. Enjoy
                  this chocolatey delight raw or baked into a soft, gooey
                  cookie.
                </p>
              )}
              {!productDesc && (
                <p className="text-[12px] max-w-[800px] font-light">
                  flour, sugar, eggs, baking powder, milk, and oil or butter.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
