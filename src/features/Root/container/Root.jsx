import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import useAuth from "../../../shared/hooks/useAuth";

import AdminNav from "../components/AdminNav";
import Spinner from "../../../shared/components/Spinner/Spinner";
import useUpdateData from "../shared/hooks/useUpdateData";

const Root = () => {
  const currentUser = useAuth();

  useUpdateData();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        draggable
        theme="dark"
      />
      {currentUser && <AdminNav />}
      <Suspense
        fallback={
          <Spinner width="5rem" height="5rem" className="mt-5 d-flex mx-auto" />
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export default Root;
