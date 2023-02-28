import React, { useContext } from "react";
import { logout } from "../../actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-between px-[50px] py-[15px] ">
        {/* <h1 className="my-auto font-black text-lg">GharSewa</h1> */}
        <div className="flex">
          <p className="px-[30px] my-auto items-end">
            <Link to={"/profile"}>My Profile</Link>
          </p>
          <p className="px-[30px] my-auto items-end" onClick={logoutHandler}>
            Logout
          </p>
          <button className="bg-slate-700 w-[120px] h-[40px] text-white rounded-[15px]">
            To-do List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
