import React from "react";
import useAuth from "../../hooks/useAuth";

const AdminDetails = ({ logoutHandler, className }) => {
  const currentUser = useAuth();
  const classNames = className
    ? `admin__nav-top-right ${className}`
    : "admin__nav-top-right";
  return (
    <div className={classNames}>
      <span>{currentUser.displayName}</span>
      <img src={currentUser.imageUrl} alt={currentUser.displayName} />
      <button className="btn btn-danger" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default AdminDetails;
