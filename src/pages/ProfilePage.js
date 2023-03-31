import React from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";

import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstant";
import { listMyOrders } from "../actions/orderActions";

import { ImCross } from "react-icons/im";

function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      // if user information has already been loaded
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Password doesnt match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>USer profile</h2>

        <form
          className="flex flex-col gap-[30px] my-[20px]"
          onSubmit={submitHandler}
        >
          <input
            className="w-[440px] shadow-in h-[45px] placeholder-[#4A1D1F] px-[30px]"
            required
            type="text"
            placeholder="Name"
            name="username"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            className="w-[440px] shadow-in h-[45px] placeholder-[#4A1D1F] px-[30px]"
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="w-[440px] shadow-in h-[45px] placeholder-[#4A1D1F] px-[30px]"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            className="w-[440px] shadow-in h-[45px] placeholder-[#4A1D1F] px-[30px]"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          {/* <Button className="w-[440px] h-[50px] bg-[#4A1D1F] text-white text-2xl rounded-[10px]"> */}
          <Button>Update</Button>
        </form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <t key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>Rs.{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <ImCross style={{ color: "red" }} />
                      // <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </t>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfilePage;
