import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstant";
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

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      // if user information has already been loaded
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
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
          <button className="w-[440px] h-[50px] bg-[#4A1D1F] text-white text-2xl rounded-[10px]">
            Update
          </button>
        </form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
}

export default ProfilePage;
