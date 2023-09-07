import { Col, Container, Row } from "reactstrap";
import { NavLink } from "react-router-dom";

import "./adminNav.css";

import Logo from "../Logo/Logo";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../redux/slices/usersSlice/usersActions";
import { useRef } from "react";
import AdminDetails from "../AdminDetails/AdminDetails";

const adminNav = [
  {
    display: "Dashboard",
    path: "/",
  },
  {
    display: "All-Products",
    path: "/all-products",
  },
  {
    display: "Orders",
    path: "/orders",
  },
  {
    display: "Users",
    path: "/users",
  },
];
const AdminNav = () => {
  const adminMenuRef = useRef();
  const dispatch = useDispatch();

  const logoutHandler = () => dispatch(adminLogout());
  const toggleAdminMenu = () => adminMenuRef.current.classList.toggle("active");

  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-top-wrapper">
              <Logo />

              <AdminDetails
                logoutHandler={logoutHandler}
                className="admin__details-nav__top"
              />

              <div className="mobile__menu">
                <span onClick={toggleAdminMenu}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu p-0" ref={adminMenuRef}>
        <Container>
          <Row className="admin__details">
            <Col sm="2">
              <span onClick={toggleAdminMenu}>
                <i className="ri-close-line"></i>
              </span>
            </Col>
            <Col sm="10">
              <AdminDetails logoutHandler={logoutHandler} />
            </Col>
          </Row>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {adminNav.map((link, i) => (
                  <li className="admin__menu-item" key={i}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
