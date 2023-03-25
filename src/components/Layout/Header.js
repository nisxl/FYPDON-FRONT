import React, { useContext } from "react";
import { logout } from "../../actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import thunk from "redux-thunk";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
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
