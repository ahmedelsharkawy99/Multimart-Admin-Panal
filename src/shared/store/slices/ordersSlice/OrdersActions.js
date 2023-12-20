import { toast } from "react-toastify";
import {
  getCollectionData,
  getOrder,
  updateOrder,
} from "../../../services/handlers/firestore";
import { ordersActions } from "./ordersSlice";
import SessionStorageService from "../../../storage/sessionStorage";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const storedOrders =
        SessionStorageService.getStoredData("multimart_orders");

      if (storedOrders) {
        dispatch(ordersActions.replaceOrders(storedOrders));
        return storedOrders;
      }

      const orders = await getCollectionData("orders");
      dispatch(ordersActions.replaceOrders(orders));
      SessionStorageService.saveData("multimart_orders", orders);
      return orders;
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const fetchOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const order = await getOrder(orderId);
      dispatch(ordersActions.updateOrder(order));
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const deliverOrder = (orderId) => {
  return async (dispatch) => {
    try {
      await updateOrder("orders", orderId);
      await dispatch(fetchOrder(orderId));
    } catch (error) {
      toast.error(error.message);
    }
  };
};
