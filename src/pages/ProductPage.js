import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Form, Col, Row, ListGroup, Button } from "react-bootstrap";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { SEED } from "../env";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";
import { useParams, useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
function ProductPage() {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { increaseCartQuantity, decreaseCartQuantity, getItemQuantity } =
    useCart();
  const { id } = useParams();
  const idNum = parseInt(id);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    error: errorProductReview,
    loading: loadingProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(idNum));
  }, [dispatch, idNum, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${idNum}?qty=${qty}`);
  };

  const [weight, setWeight] = useState("1 lbs");
  const [productDesc, setProdDesc] = useState(true);
  const items = [
    {
      label: <p onClick={() => setWeight(2)}>2 lbs</p>,
      key: "0",
    },
    {
      label: <p onClick={() => setWeight(3)}>3 lbs</p>,
      key: "1",
    },
    {
      type: "divider",
    },
  ];

  const location = useLocation();
  const rat = [1, 2, 3, 4, 5];
  // const item = product.find((i) => i._id === idNum);
  // const quantity = getItemQuantity(product._id);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(idNum, { rating, comment }));
  };
  return (
    <div>
      <div key={idNum}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="flex gap-[140px]">
            <img
              key={idNum}
              src={`${SEED}${product.image}`}
              className="ml-[120px] w-[400px] h-[450px]"
              alt="nischal"
            />
            <div className="flex flex-col mt-3 mr-[140px] font-bold">
              <p className="text-[32px] font-bold">{product.name}</p>
              <div className="flex gap-5">
                <div className="flex items-center">
                  <div className="flex gap-2 mb-3 mt-[20px] pr-4 border-r-2">
                    {rat.map((rating, i) => {
                      return rating <= Math.floor(product.rating) ? (
                        <img
                          src="../images/star.png"
                          className="h-[19px] w-[19px]"
                        />
                      ) : (Math.abs(product.rating - rating) > 0.25) &
                        (Math.abs(product.rating - rating) < 0.76) ? (
                        <img
                          src="../images/starHalf.png"
                          className="h-[19px] w-[19px]"
                        />
                      ) : Math.abs(rating - product.rating) < 0.25 ? (
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

                    <span>{product.rating}</span>
                  </div>
                  <div className="flex pl-4 gap-24 items-center">
                    <span>15 reviews</span>
                    <img
                      src="../images/fav.png"
                      className="w-[19px] h-[19px]"
                    />
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
                        onClick={() => decreaseCartQuantity(product.id)}
                      >
                        -
                      </span>
                      {/* <span>{quantity}</span> */}
                      <span
                        className="px-2 border-l cursor-pointer"
                        onClick={() => increaseCartQuantity(product.id)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {product.countInStock > 0 && (
                <div>
                  qty
                  <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </div>
              )}
              <div className="flex justify-center">
                <div
                  className="flex justify-center mt-[80px] w-[200px] bg-[#4A1D1F] rounded-full py-[6px] text-white cursor-pointer"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </div>
              </div>
              <p className="text-[14px] font-light mt-6">
                Order Directly from Messenger: Send Message
              </p>
              <p className="p-2 text-[12px] font-light bg-[#FBEDCD]">
                This cake requires at least 3 lb(s). The price shown above is
                per lb in base options. The final price might change based on
                the options you choose.
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
                    classic. It's our OG recipe, and always a fan favorite.
                    Enjoy this chocolatey delight raw or baked into a soft,
                    gooey cookie.
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

      <div>
        <Row>
          <Col md={6}>
            <h4>Reviews</h4>
            {product.reviews.length === 0 && (
              <Message variant="info">No Reviews</Message>
            )}
            <ListGroup variant="flush">
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  {/* <Rating value={review.rating} colors="#f8e825" /> */}

                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}

              <ListGroup.Item>
                <h4>Write a review</h4>
                {loadingProductReview && <Loader />}
                {successProductReview && (
                  <Message variant="success">Review Submitted</Message>
                )}

                {errorProductReview && (
                  <Message variant="danger">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="comment">
                      <Form.Label>Review</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      className="bg-green"
                      disabled={loadingProductReview}
                      type="submit"
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message variant="info">
                    Please <Link to="/login">Login</Link> to write a review
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ProductPage;
