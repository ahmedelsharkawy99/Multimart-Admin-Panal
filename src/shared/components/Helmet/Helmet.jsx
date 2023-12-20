import { useEffect } from "react";

const Helmet = ({ title, children }) => {
  document.title = "Multimart - " + title;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return children;
};

export default Helmet;
