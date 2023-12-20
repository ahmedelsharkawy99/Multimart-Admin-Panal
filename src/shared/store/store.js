import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice/productsSlice";
import usersSlice from "./slices/usersSlice/usersSlice";
import ordersSlice from "./slices/ordersSlice/ordersSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    users: usersSlice,
    orders: ordersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
