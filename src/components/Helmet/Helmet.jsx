import React from "react";

const Helmet = ({ title, children }) => {
  document.title = "Multimart - " + title;
  return <>{children}</>;
};

export default Helmet;
