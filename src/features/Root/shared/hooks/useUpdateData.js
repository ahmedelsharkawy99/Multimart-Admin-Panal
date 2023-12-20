import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import SessionStorageService from "../../../../shared/storage/sessionStorage";
import {
  adminLogout,
  authState,
  fetchUsers,
} from "../../../../shared/store/slices/usersSlice/usersActions";

import { dashboardStatus } from "../../../../shared/services/handlers/firestore";
import { usersActions } from "../../../../shared/store/slices/usersSlice/usersSlice";
import { ordersActions } from "../../../../shared/store/slices/ordersSlice/ordersSlice";
import { fetchOrders } from "../../../../shared/store/slices/ordersSlice/OrdersActions";
import { productsAcrions } from "../../../../shared/store/slices/productsSlice/productsSlice";
import { fetchProductsItems } from "../../../../shared/store/slices/productsSlice/productsActions";

const useUpdateData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(async () => {
      const currentUser = await dispatch(authState());

      console.log(currentUser);

      if (currentUser) {
        const users = await dispatch(fetchUsers());
        const orders = await dispatch(fetchOrders());
        const usersStatus = await dashboardStatus("users");
        const ordersStatus = await dashboardStatus("orders");
        const productsStatus = await dashboardStatus("products");
        const products = await dispatch(fetchProductsItems());

        SessionStorageService.saveData("multimart_users", users);
        SessionStorageService.saveData("multimart_orders", orders);
        SessionStorageService.saveData("multimart_admin", currentUser);
        SessionStorageService.saveData("multimart_products", products);
        SessionStorageService.saveData(
          "multimart_dashboard_users_status",
          usersStatus.count
        );
        SessionStorageService.saveData(
          "multimart_dashboard_orders_status",
          ordersStatus
        );
        SessionStorageService.saveData(
          "multimart_dashboard_products_status",
          productsStatus.count
        );

        dispatch(usersActions.setUserStatus(usersStatus.count));
        dispatch(ordersActions.setOrdersStatus(ordersStatus));
        dispatch(productsAcrions.setProductsStatus(productsStatus.count));

        console.log("done");
      } else {
        toast.warning("Your session has expired. Please login again.");

        await dispatch(adminLogout());

        clearInterval(interval);
      }
    }, 30 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);
};

export default useUpdateData;
