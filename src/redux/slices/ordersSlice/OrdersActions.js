import { toast } from "react-toastify";
import {
  getCollectionData,
  getOrder,
  updateOrder,
} from "../../../handlers/firestore";
import { ordersActions } from "./ordersSlice";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const orders = await getCollectionData("orders");
      dispatch(ordersActions.replaceOrders(orders));
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
