import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Layout from "./components/Layout/Layout";

import "./App.css";
import { fetchOrders } from "./redux/slices/ordersSlice/OrdersActions";
import { authState, fetchUsers } from "./redux/slices/usersSlice/usersActions";
import { fetchProductsItems } from "./redux/slices/productsSlice/productsActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authState());
    dispatch(fetchProductsItems());
    dispatch(fetchUsers());
    dispatch(fetchOrders());
  }, [dispatch]);
  return <Layout />;
}

export default App;
