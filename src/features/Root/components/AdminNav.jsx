import { useRef } from "react";

import "../shared/styles/adminNav.css";

import Header from "./Header";
import Navigation from "./Navigation";

const AdminNav = () => {
  const adminMenuRef = useRef();

  const toggleAdminMenu = () => adminMenuRef.current.classList.toggle("active");

  return (
    <>
      <Header toggleAdminMenu={toggleAdminMenu} />
      <Navigation toggleAdminMenu={toggleAdminMenu} ref={adminMenuRef} />
    </>
  );
};

export default AdminNav;
