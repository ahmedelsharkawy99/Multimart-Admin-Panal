import { json, redirect } from "react-router-dom";

import store from "../../../../shared/store/store";
import SessionStorageService from "../../../../shared/storage/sessionStorage";
import { dashboardStatus } from "../../../../shared/services/handlers/firestore";

import { usersActions } from "../../../../shared/store/slices/usersSlice/usersSlice";
import { ordersActions } from "../../../../shared/store/slices/ordersSlice/ordersSlice";
import { productsAcrions } from "../../../../shared/store/slices/productsSlice/productsSlice";

const handleDispatch = (data) => {
  store.dispatch(usersActions.setUserStatus(data.storedUsersStatus));
  store.dispatch(ordersActions.setOrdersStatus(data.storedOrdersStatus));
  store.dispatch(productsAcrions.setProductsStatus(data.storedProductsStatus));
};

const fetchStatus = async (path, sessionPath) => {
  const data = await dashboardStatus(path);
  if (path === "orders") {
    SessionStorageService.saveData(sessionPath, data);
  } else {
    SessionStorageService.saveData(sessionPath, data.count);
  }

  return data;
};

export const dashboardLoader = async () => {
  try {
    const currentUser = SessionStorageService.getStoredData("multimart_admin");

    if (!currentUser) {
      return redirect("/login");
    }

    let storedUsersStatus = SessionStorageService.getStoredData(
      "multimart_dashboard_users_status"
    );
    let storedProductsStatus = SessionStorageService.getStoredData(
      "multimart_dashboard_products_status"
    );
    let storedOrdersStatus = SessionStorageService.getStoredData(
      "multimart_dashboard_orders_status"
    );

    if (!storedUsersStatus) {
      const usersCount = (
        await fetchStatus("users", "multimart_dashboard_users_status")
      ).count;

      storedUsersStatus = usersCount;
    }

    if (!storedProductsStatus) {
      const productsCount = (
        await fetchStatus("products", "multimart_dashboard_products_status")
      ).count;

      storedProductsStatus = productsCount;
    }

    if (!storedOrdersStatus) {
      const ordersStatus = await fetchStatus(
        "orders",
        "multimart_dashboard_orders_status"
      );

      storedOrdersStatus = ordersStatus;
    }

    handleDispatch({
      storedUsersStatus,
      storedOrdersStatus,
      storedProductsStatus,
    });

    return {
      users: storedUsersStatus,
      products: storedProductsStatus,
      orders: storedOrdersStatus,
    };
  } catch (error) {
    throw json(
      {
        message:
          error.message || "Could not fetch users, products or orders data.",
      },
      { status: 500 }
    );
  }
};
