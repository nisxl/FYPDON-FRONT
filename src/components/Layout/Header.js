import React, { useContext } from "react";
import { logout } from "../../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import thunk from "redux-thunk";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import SearchBox from "../UI/SearchBox";
import NavDropdown from "react-bootstrap/NavDropdown";
const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <Link to="/cart">
        <div>Cart</div>
      </Link>
      <div className="flex justify-between px-[50px] py-[15px] ">
        {userInfo ? (
          <NavDropdown title={userInfo.name} id="username">
            <LinkContainer to="/profile">
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>

            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        )}
        <SearchBox />

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
            <LinkContainer to="/admin/userlist">
              <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        )}
        {/* <div className="flex">
          <p className="px-[30px] my-auto items-end">
            <Link to={"/profile"}>My Profile</Link>
          </p>
          <p className="px-[30px] my-auto items-end" onClick={logoutHandler}>
            Logout
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
