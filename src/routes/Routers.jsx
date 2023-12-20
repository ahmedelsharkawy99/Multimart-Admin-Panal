import { lazy } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LogRoutes from "./LogRoutes";
import Root from "../features/Root/container/Root";
import { rootLoader } from "../features/Root/shared/utils/loader";

const Login = lazy(() => import("../features/Login/container/Login"));
const Users = lazy(() => import("../features/Users/container/Users"));
const Orders = lazy(() => import("../features/Orders/container/Orders"));
const Products = lazy(() => import("../features/Products/container/Products"));
const AddUser = lazy(() => import("../features/AddUser/container/AddUser"));
const Dashboard = lazy(() =>
  import("../features/Dashboard/container/Dashboard")
);
const AddProduct = lazy(() =>
  import("../features/AddProduct/container/AddProduct")
);

const EditProduct = lazy(() =>
  import("../features/EditProduct/container/EditProduct")
);

const Routers = () => {
  const loggedInRoutes = [
    {
      index: true,
      element: <Dashboard />,
      async loader() {
        const { dashboardLoader } = await import(
          "../features/Dashboard/shared/utils/loader"
        );
        return dashboardLoader();
      },
    },
    {
      path: "/users",
      element: <Users />,
      async loader() {
        const { usersLoader } = await import(
          "../features/Users/shared/utils/loader"
        );
        return usersLoader();
      },
    },
    {
      path: "/orders",
      element: <Orders />,
      async loader() {
        const { ordersLoader } = await import(
          "../features/Orders/shared/utils/loader"
        );
        return ordersLoader();
      },
    },
    {
      path: "/products",
      element: <Products />,
      async loader() {
        const { productsLoader } = await import(
          "../features/Products/shared/utils/loader"
        );
        return productsLoader();
      },
    },
    {
      path: "/add-product",
      element: <AddProduct />,
    },
    {
      path: "users/add-user",
      element: <AddUser />,
    },
    {
      path: "/prducts/:id/edit",
      element: <EditProduct />,
      async loader({ params }) {
        const { id } = params;
        const { editProductLoader } = await import(
          "../features/EditProduct/shared/utils/loader"
        );
        return editProductLoader(id);
      },
    },
  ];

  const loggedOutRouts = [
    {
      path: "/",
      element: <LogRoutes />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ];

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader: () => rootLoader(),
      children: [...loggedInRoutes, ...loggedOutRouts],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Routers;
