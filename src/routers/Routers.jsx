import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";

import LogRoutes from "./LogRoutes";

import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const Users = lazy(() => import("../pages/Users/Users"));
const Orders = lazy(() => import("../pages/Orders/Orders"));
const AddUser = lazy(() => import("../pages/AddUser/AddUser"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const AddProduct = lazy(() => import("../pages/AddProduct/AddProduct"));
const AllProducts = lazy(() => import("../pages/AllProducts/AllProducts"));

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense
            fallback={
              <div className="text-center">
                <LoadingSpinner />
              </div>
            }
          >
            <Dashboard />
          </Suspense>
        }
      />

      <Route
        path="/all-products"
        element={
          <Suspense
            fallback={
              <div className="text-center">
                <LoadingSpinner />
              </div>
            }
          >
            <AllProducts />
          </Suspense>
        }
      />

      <Route
        path="/add-product"
        element={
          <Suspense
            fallback={
              <div className="text-center">
                <LoadingSpinner />
              </div>
            }
          >
            <AddProduct />
          </Suspense>
        }
      />

      <Route
        path="/users"
        element={
          <Suspense
            fallback={
              <div className="text-center">
                <LoadingSpinner />
              </div>
            }
          >
            <Users />
          </Suspense>
        }
      />

      <Route
        path="/orders"
        element={
          <Suspense
            fallback={
              <div className="text-center">
                <LoadingSpinner />
              </div>
            }
          >
            <Orders />
          </Suspense>
        }
      />

      <Route
        path="/users/add-user"
        element={
          <Suspense
            fallback={
              <div className="text-center">
                <LoadingSpinner />
              </div>
            }
          >
            <AddUser />
          </Suspense>
        }
      />

      <Route path="/*" element={<LogRoutes />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default Routers;
