import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../../util/helpers";

const initialState = {
  orders: [],
  totalSales: 0,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    replaceOrders: (state, action) => {
      state.orders = action.payload.map((order) => ({
        ...order,
        paidAt: formatDate(order?.paidAt?.seconds),
        deliveredAt: formatDate(order?.deliveredAt?.seconds),
        createdAt: formatDate(order?.createdAt?.seconds),
      }));
      state.totalSales = action.payload.reduce(
        (total, items) => total + Number(items.orderDetails.totalAmount),
        0
      );
    },

    updateOrder: (state, action) => {
      const existingOrderIndex = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );

      state.orders[existingOrderIndex] = {
        ...action.payload,
        paidAt: formatDate(action.payload?.paidAt?.seconds),
        deliveredAt: formatDate(action.payload?.deliveredAt?.seconds),
      };
    },
  },
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice.reducer;
