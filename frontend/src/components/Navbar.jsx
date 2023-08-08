import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
// import { reset, logout } from "../app/reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Person, BoxArrowInRight, BoxArrowInLeft } from "react-bootstrap-icons";
import Logout from "./Logout";

const Navbar = () => {
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   dispatch(logout());
  //   dispatch(reset());
  //   navigate("/");
  // };

  return (
    <>
      <Container className="header" fluid>
        <Row>
          <Col>
            <div className="p_image">
              {/* Your account image here */}
              {/* You can add your account image here */}
              {/* For example: <img src={user.image} alt="User Avatar" /> */}

              {/* Logout Dropdown */}
              {/* <DropdownButton id="dropdown-logout" title={<Person size={30} />}>
                {user ? (
                  <Dropdown.Item>
                    <BoxArrowInRight className="logout_btn" />
                    <Logout />
                  </Dropdown.Item>
                ) : (
                  ""
                )}
              </DropdownButton> */}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Navbar;
{
  /* <Col>
          </Col> */
}
{
  /* <img src={logo} /> */
}
{
  /* <Col>
            {user ? (
              <>
                <button className="btn" onClick={handleLogout}>
                  <BoxArrowInLeft className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <BoxArrowInRight className="mr-2" /> Login
                </Link>
                <Link to="/signup">
                  <Person className="mr-2" /> Register
                </Link>
              </>
            )}
          </Col> */
}
