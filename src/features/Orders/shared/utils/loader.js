import { json, redirect } from "react-router-dom";

import store from "../../../../shared/store/store";
import SessionStorageService from "../../../../shared/storage/sessionStorage";
import { fetchOrders } from "../../../../shared/store/slices/ordersSlice/OrdersActions";
import { ordersActions } from "../../../../shared/store/slices/ordersSlice/ordersSlice";

export const ordersLoader = async () => {
  try {
    const currentUser = SessionStorageService.getStoredData("multimart_admin");

    if (!currentUser) {
      return redirect("/login");
    }

    const storedOrders =
      SessionStorageService.getStoredData("multimart_orders");

    if (!storedOrders) {
      const products = await store.dispatch(fetchOrders());
      SessionStorageService.saveData("multimart_orders", products);
      return products;
    }

    store.dispatch(ordersActions.replaceOrders(storedOrders));

    return storedOrders;
  } catch (error) {
    throw json(
      { message: "Could not fetch orders data." },
      {
        status: 500,
      }
    );
  }
};
