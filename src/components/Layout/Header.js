import React, { useContext, useEffect, useState } from "react";
import { logout } from "../../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Menu, Dropdown } from "antd";

import { FaRegUser } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { useCart } from "../../context/CartContext";
import NavDropdown from "react-bootstrap/NavDropdown";
const Header = () => {
  const { openCart, cartQuantity } = useCart();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }
  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");

        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={logoutHandler}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div class="bg-slate-50 flex dark:bg-[black] dark:text-white justify-between items-center h-[64px] pl-4 md:pl-8 sticky top-0 z-2">
      <Link to="/">
        <div class="pointer">
          <img
            class="h-[50px] w-[47px] rounded-full"
            src="../../images/rollers.png"
            alt="nscihhal"
          />
        </div>
      </Link>
      <div class="flex justify-between px-2 md:px-[50px] items-center py-[15px] ">
        <div class="mr-2 md:mr-6">
          {userInfo ? (
            <Dropdown overlay={menu} trigger={["click"]}>
              <a class="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <div class="flex items-center gap-2">
                  {" "}
                  <span class="dark:text-white">{userInfo.name}</span>
                  <span class="dark:text-white">
                    {" "}
                    <FaRegUser />{" "}
                  </span>
                </div>
              </a>
            </Dropdown>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        <div class="mr-2 md:mr-6">
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="Admin" id="adminmenue">
              <LinkContainer to="/admin/userlist">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/productlist">
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/orderlist">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </div>

        <div class="mt-[15px] flex justify-center items-center pr-2 md:pr-10 gap-4 md:gap-8">
          <Link
            to="/about"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <p class="flex items-center cursor-pointer text-sm md:text-base">
              About Us
            </p>
          </Link>

          <Link
            to="/contact"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <p class="flex items-center cursor-pointer text-sm md:text-base">
              Contact Us
            </p>
          </Link>

          <div onClick={openCart} class="cursor-pointer mb-[15px]">
            {/* <span>{cartQuantity}</span> */}
            <BsCartCheck />
          </div>
        </div>

        <div class="duration-100 rounded mt-[8px]">
          {theme === "dark" ? (
            <button
              onClick={() => setTheme("light")}
              class={`w-6 h-6 md:w-8 md:h-8 leading-9 text-xs md:text-xl rounded-full m-1 ${
                theme === "dark" && "text-sky-600"
              }`}
            >
              <ion-icon
                name="sunny"
                class="ml-[2px] md:ml-[5px] mt-[2px] md:mt-[5px]"
              ></ion-icon>
            </button>
          ) : (
            <button
              onClick={() => setTheme("dark")}
              class={`w-6 h-6 md:w-8 md:h-8 leading-9 text-xs md:text-xl rounded-full m-1 ${
                theme === "light" && "text-sky-600"
              }`}
            >
              <ion-icon name="moon"></ion-icon>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
