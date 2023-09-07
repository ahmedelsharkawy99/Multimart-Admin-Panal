import Routers from "../../routers/Routers";
import AdminNav from "../AdminNav/AdminNav";
import useAuth from "../../hooks/useAuth";

const Layout = () => {
  const currentUser = useAuth();

  return (
    <>
      {currentUser && <AdminNav />}
      <Routers />
    </>
  );
};

export default Layout;
