import React, { useContext, useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";

const RegisterPage = (location, history) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);

  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Password doesnt match");
    } else {
      dispatch(register(name, email, password));
      // navigate("/login");
    }
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
    //           <label>Name</label>
    //           <input
    //             required
    //             type="text"
    //             name="username"
    //             value={name}
    //             // placeholder="Enter username"
    //             onChange={(e) => setName(e.target.value)}
    //             className="border-b-2 h-[40px]"
    //           />
    //           <label>Email</label>
    //           <input
    //             required
    //             type="text"
    //             name="username"
    //             // placeholder="Enter username"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             className="border-b-2 h-[40px]"
    //           />
    //           <label>Password</label>
    //           <input
    //             required
    //             type="password"
    //             name="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             // placeholder="Enter password"
    //             className="border-b-2 h-[40px]"
    //           />
    //           <label>Confirm Password</label>
    //           <input
    //             required
    //             type="password"
    //             name="confirm password"
    //             value={confirmPassword}
    //             onChange={(e) => setConfirmPassword(e.target.value)}
    //             // placeholder="Enter password"
    //             className="border-b-2 h-[40px]"
    //           />

    //           <button className="bg-slate-700 w-[180px] h-[40px] text-white rounded-[15px] mx-auto">
    //             Register
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //     <p className="text-center text-zinc-400 font-thin">
    //       Have an Account?
    //       <u>
    //         <Link to={redirect ? ` /login?redirect=${redirect}` : "/login"}>
    //           Sign In
    //         </Link>
    //       </u>
    //     </p>
    //   </div>
    // </div>

    <div className="pt-[80px] h-[100vh] text-[#4A1D1F] bg-[#F4F4F2] 2xl:px-[8vw]">
      <div className="flex items-center justify-center justify-items-start flex-col gap-[20px] px-[6vw]"></div>
      <div className="flex flex-col items-center justify-center gap-[20px]">
        <h2 className="text-5xl font-semibold ">Register</h2>
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
            Sign up
          </button>
        </form>
        <p>Forgot password?</p>
        <p className="text-center text-zinc-400 font-thin">
          Have an Account?
          <u>
            <Link to={redirect ? ` /login?redirect=${redirect}` : "/login"}>
              Sign In
            </Link>
          </u>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
