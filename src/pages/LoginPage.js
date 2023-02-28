import React, { useContext, useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";

const LoginPage = (location, history) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);

  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    // <div className="flex justify-between">
    //   <img
    //     src={require("../image/fyp2.jpeg")}
    //     alt="login"
    //     className="w-[854px] h-screen"
    //   />
    //   <div className="p-7 w-full my-auto space-y-[100px]">
    //     <h1 className="text-3xl font-black text-center">GharSewa</h1>
    //     <div>
    //       <p className="text-zinc-400 font-thin text-center">
    //         Welcome to GharSewa
    //       </p>

    //       {/* <form onSubmit={(e) => loginUser(e)}> */}
    //       <form onSubmit={submitHandler}>
    //         <div className="flex flex-col p-[20px] space-y-[20px]">
    //           <label>Username</label>
    //           <input
    //             type="text"
    //             name="username"
    //             value={email}
    //             // placeholder="Enter username"
    //             onChange={(e) => setEmail(e.target.value)}
    //             className="border-b-2 h-[40px]"
    //           />
    //           <label>Password</label>
    //           <input
    //             type="password"
    //             name="password"
    //             onChange={(e) => setPassword(e.target.value)}
    //             value={password}
    //             // placeholder="Enter password"
    //             className="border-b-2 h-[40px]"
    //           />

    //           <button className="bg-slate-700 w-[180px] h-[40px] text-white rounded-[15px] mx-auto">
    //             Submit
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //     <p className="text-center text-zinc-400 font-thin">
    //       New to GharSewa?
    //       <u>
    //         <Link to={"/register"}>Create a New Account</Link>
    //       </u>
    //     </p>
    //   </div>
    // </div>

    <div className="flex justify-center h-[100vh] text-[#4A1D1F] bg-[#F4F4F2]">
      <div className="flex justify-center items-center overflow-hidden"></div>
      <div className="flex flex-col items-center justify-center gap-[10px] ">
        <div className="shadow-xl py-[60px] px-[40px] flex flex-col items-center justify-center bg-[#FBEDCD] gap-[30px] rounded-[20px] border-[#4A1D1F] border-[px]">
          <h1 className="text-5xl font-semibold ">Rollers Bakery</h1>
          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-[30px] my-[20px] rounded-[20px]"
          >
            <input
              className="w-[440px] shadow-in h-[45px] placeholder-[#4A1D1F] px-[30px]"
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-[440px] shadow-in h-[45px] placeholder-[#4A1D1F] px-[30px]"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className="w-[440px] h-[50px] bg-[#4A1D1F] text-white text-2xl rounded-[10px]">
              Log in
            </button>
          </form>
          <div className="flex flex-col justify-center items-center">
            <p>Forgot password</p>
            <Link to={"/register"}>
              <p>Don't have an account? Sign up.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
